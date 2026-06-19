async function initLiveEvent() {
  const container = document.querySelector(".live-container");

  if (!container) return;

  const hash = window.location.hash;
  const parts = hash.replace("#", "").split("/");

  const bandId = parts[1] || "togenashitogeari";
  const initialFilter = parts[2] || "all";

  const bands = await fetchBandsData();
  const liveData = await fetchLiveData();

  const currentBand = bands.find((band) => band.id === bandId);

  if (!currentBand) {
    container.innerHTML = "<h2>밴드 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  // 현재 밴드가 참여한 라이브만 필터링
  const bandLives = liveData.filter((live) => live.participate.includes(currentBand.id));

  // 날짜 오름차순 정렬 (첫 번째 일정 기준)
  bandLives.sort((a, b) => {
    const dateA = a.schedules[0]?.date || "9999.99.99";
    const dateB = b.schedules[0]?.date || "9999.99.99";
    return dateA.localeCompare(dateB);
  });

  renderLiveList(container, bands, currentBand, bandLives, initialFilter);
}

async function initLiveDetail() {
  const container = document.querySelector(".live-container");

  if (!container) return;

  const hash = window.location.hash;
  const parts = hash.replace("#", "").split("/");
  const liveId = parts[1];

  if (!liveId) {
    container.innerHTML = "<h2>라이브 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  const bands = await fetchBandsData();
  const liveData = await fetchLiveData();

  // 현재 라이브 데이터 찾기
  const currentLive = liveData.find((live) => live.id === liveId);

  if (!currentLive) {
    container.innerHTML = "<h2>라이브 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  // 참여 밴드 찾기 (밴드가 여럿일 경우 첫 번째 밴드를 기준으로)
  const currentBandId = currentLive.participate[0];
  const currentBand = bands.find((band) => band.id === currentBandId) || bands[0];

  renderLiveDetailView(container, bands, currentBand, currentLive);
}

async function renderLiveList(container, bands, currentBand, bandLives, initialFilter) {
  // 밴드 탭
  const tabMenuHTML = bands
    .map((band) => {
      const isActive = band.id === currentBand.id ? "active" : "";

      return `
        <a href="#live/${band.id}" class="band-tab ${isActive}">
          <img src="${band.images.tab_logo.default}" class="tab-logo-default">
          <img src="${band.images.tab_logo.hover}" class="tab-logo-hover">
        </a>
      `;
    })
    .join("");

  // 라이브 목록 or 빈 화면
  let liveContentHTML = "";
  if (bandLives.length === 0) {
    liveContentHTML = `
      <div class="empty-state">
        <p class="empty-text">COMING SOON</p>
      </div>
    `;
  } else {
    const liveCardsHTML = bandLives.map((live) => {
      const imgHTML = live.key_visual
        ? `<img src="${live.key_visual}" class="live-kv-img">`
        : `<div class="no-img-placeholder">NO IMAGE</div>`;

      const firstDate = live.schedules[0]?.date || "일정 미정";

      return `
        <a href="#live_detail/${live.id}" class="live-card" data-type="${live.type}">
          <div class="live-img-box">
            ${imgHTML}
          </div>
          <div class="live-info-box">
            <span class="live-date">${firstDate}</span>
            <h3 class="live-title">${live.title.ko}</h3>
          </div>
        </a>
      `;
    }).join("");

    liveContentHTML = `
      <div class="filter-menu">
        <a href="#live/${currentBand.id}" class="filter-btn active" data-filter="all">ALL</a>
        <a href="#live/${currentBand.id}" class="filter-btn" data-filter="one-man">ONE-MAN</a>
        <a href="#live/${currentBand.id}" class="filter-btn" data-filter="taiban">대반</a>
        <a href="#live/${currentBand.id}" class="filter-btn" data-filter="etc">etc.</a>
      </div>
      <div class="live-grid">
        ${liveCardsHTML}
      </div>
      <div class="empty-state filter-empty-state" style="display: none;">
        <p class="empty-text">COMING SOON</p>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="live-view">
      <div class="section-title">LIVE</div>

      <div class="band-tab-menu">
        <img src="${currentBand.images.background}" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="live-content">
        ${liveContentHTML}
      </div>
    </div>
  `;

  // 필터링 로직
  const filterBtns = container.querySelectorAll(".filter-btn");
  const liveCards = container.querySelectorAll(".live-card");
  const filterEmptyState = container.querySelector(".filter-empty-state");

  // 라이브 정보가 없는 경우도 있음
  if (filterBtns.length > 0 && liveCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // 클릭한 버튼에만 active 추가
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // 클릭한 버튼의 필터값 추출
        const filterValue = btn.getAttribute("data-filter");

        // 브라우저 주소창 url을 현재 필터에 맞춰서 변경
        history.replaceState(null, null, `#live/${currentBand.id}/${filterValue}`)

        // 카드 필터링
        let visibleCount = 0;
        liveCards.forEach((card) => {
          const liveType = card.getAttribute("data-type");

          if (filterValue === "all" || filterValue === liveType) {
            card.style.display = ""; // 카드 보여주기
            visibleCount++;
          } else {
            card.style.display = "none"; // 카드 숨기기
          }
        });

        // 노출된 카드가 0개인 경우
        if (filterEmptyState) {
          if (visibleCount === 0) {
            filterEmptyState.style.display = "flex";
          } else {
            filterEmptyState.style.display = "none";
          }
        }
      });
    });

    // HTML 렌더링 후 필터와 일치하는 버튼으로 강제 클릭 이벤트 발생
    const targetBtn = Array.from(filterBtns).find(btn => btn.getAttribute("data-filter") === initialFilter);
    if (targetBtn) {
      targetBtn.click();
    }
  }
}

async function renderLiveDetailView(container, bands, currentBand, currentLive) {
  // 밴드 탭
  const tabMenuHTML = bands
    .map((band) => {
      const isActive = band.id === currentBand.id ? "active" : "";

      return `
        <a href="#live/${band.id}" class="band-tab ${isActive}">
          <img src="${band.images.tab_logo.default}" class="tab-logo-default">
          <img src="${band.images.tab_logo.hover}" class="tab-logo-hover">
        </a>
      `;
    })
    .join("");

  // 캐스트 영역 (캐스트가 미정인 경우도 있음)
  let castHTML = "";
  if (currentLive.cast && currentLive.cast.length > 0) {
    const castGroups = currentLive.cast
      .map((group) => `
        <div class="cast-group">
          <div class="cast-band-name"><i class="fa-solid fa-diamond"></i> ${group.band}</div>
          <div class="cast-list">${group.members.join(" / ")}</div>
        </div>
      `).join("");

    castHTML = `
      <div class="live-cast-box">
        <div class="cast-label">CAST</div>
        ${castGroups}
      </div>
    `;
  }

  // 다중 일정 탭 (일정이 2개 이상일 때만 표시)
  let scheduleTabsHTML = "";
  if (currentLive.schedules && currentLive.schedules.length > 1) {
    scheduleTabsHTML = `
        <div class="filter-menu schedule-tab-menu">
          ${currentLive.schedules
        .map((sch, idx) => `
              <button class="filter-btn sub-tab-btn ${idx === 0 ? "active" : ""}" data-id="${sch.day_id}">
                ${sch.day_name}
              </button>
            `).join("")}
        </div>
      `;
  }

  const liveDetailContentHTML = `
    <div class="filter-menu">
      <a href="#live/${currentBand.id}/all" class="filter-btn active" data-filter="all">ALL</a>
      <a href="#live/${currentBand.id}/one-man" class="filter-btn" data-filter="one-man">ONE-MAN</a>
      <a href="#live/${currentBand.id}/taiban" class="filter-btn" data-filter="taiban">대반</a>
      <a href="#live/${currentBand.id}/etc" class="filter-btn" data-filter="etc">etc.</a>
    </div>
    <div class="live-detail-wrapper">
      
      <div class="live-hero-banner">
        ${currentLive.key_visual
      ? `<img src="${currentLive.key_visual}" class="live-hero-img">`
      : `<div class="no-img-placeholder">NO IMAGE</div>`}
      </div>
      <div class="live-detail-info">
        <h2 class="live-detail-title-main">${currentLive.title.ko}</h2>
        ${currentLive.title.ja ? `<div class="live-detail-title-sub">${currentLive.title.ja}</div>` : ""}
        ${castHTML}  
      </div>
      <div class="setlist-wrapper">
        ${scheduleTabsHTML}
        <div class="setlist-content-box" id="setlist-display-area"></div>
      </div>

    </div>
  `;

  container.innerHTML = `
      <div class="live-view">
        <div class="section-title">LIVE</div>

        <div class="band-tab-menu">
          <img src="${currentBand.images.background}" class="menu-bg-img">
          ${tabMenuHTML}
        </div>

        <div class="live-detail-content">
          ${liveDetailContentHTML}
        </div>

        <div class="back-btn-wrapper">
          <a href="#live/${currentBand.id}" class="back-to-list-btn"><i class="fa-solid fa-chevron-left"></i>목록으로 돌아가기</a>
        </div>
      </div>
    `;

  // 스케쥴 교체 탭, 세트리스트
  const displayArea = document.getElementById("setlist-display-area");
  const tabBtns = container.querySelectorAll(".sub-tab-btn");

  const renderScheduleData = (schedule) => {
    if (!schedule) return;

    let setlistHTML = "";
    let setlistNoteHTML = "";

    if (schedule.setlist?.note) {
      setlistNoteHTML = `<span class="setlist-note">${schedule.setlist.note}</span>`;
    }

    const hasRegular = schedule.setlist?.regular && schedule.setlist.regular.length > 0;
    const hasEncore = schedule.setlist?.encore && schedule.setlist.encore.length > 0;

    // 세트리스트 정보가 아예 없는 경우
    if (!hasRegular && !hasEncore) {
      setlistHTML = `
          <div class="empty-state"">
            <p class="empty-text">COMING SOON</p>
          </div>
        `;
    } else {
      const createTrackHTML = (track) => {
        const listNo = isNaN(track.list_no) ? track.list_no : String(track.list_no).padStart(2, "0");
        const subTitles = [];

        if (track.title?.ja) subTitles.push(track.title.ja);
        if (track.title?.en) subTitles.push(track.title.en);

        const subTitleHTML = subTitles.length > 0 ? `<div class="setlist-name-sub">(${subTitles.join(" | ")})</div>` : "";

        return `
          <div class="setlist-row">
            <div class="setlist-num">${listNo}</div>
            <div class="setlist-text-group">
              <div class="setlist-name-main">${track.title.ko}</div>
              ${subTitleHTML}
            </div>
          </div>
          `;
      }

      // 세트리스트 정보가 있으면 추가
      if (hasRegular) {
        setlistHTML += schedule.setlist.regular.map(createTrackHTML).join("");
      }

      if (hasEncore) {
        setlistHTML += schedule.setlist.encore.map(createTrackHTML).join("");
      }
    }

    displayArea.innerHTML = `
      <div class="schedule-meta-info">
        <div class="meta-item"><i class="fa-regular fa-calendar"></i> ${schedule.date || "일정 미정"}</div>
        <div class="meta-item"><i class="fa-solid fa-location-dot"></i> ${schedule.venue || "장소 미정"}</div>
      </div>

      <div class="setlist-header">
        <h3 class="setlist-label">SETLIST</h3>
        ${setlistNoteHTML}
      </div>

      <div class="setlist-container">
        ${setlistHTML}
      </div>
    `;

  };

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // 클릭한 버튼에만 active 추가
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active")

        // 전체 일정 배열에서 day_id가 일치하는 스케쥴 찾기
        const targetDayId = btn.getAttribute("data-id");
        const targetSchedule = currentLive.schedules.find((sch) => sch.day_id === targetDayId);

        if (targetSchedule) {
          renderScheduleData(targetSchedule);
        }
      });
    });
  }

  // 초기 렌더링
  if (currentLive.schedules && currentLive.schedules.length > 0) {
    renderScheduleData(currentLive.schedules[0]);
  }
}