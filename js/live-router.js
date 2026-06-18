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

        liveCards.forEach((card) => {
          const liveType = card.getAttribute("data-type");

          if (filterValue === "all" || filterValue === liveType) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // HTML 렌더링 후 필터와 일치하는 버튼으로 강제 클릭 이벤트 발생
    const targetBtn = Array.from(filterBtns).find(btn => btn.getAttribute("data-filter") === initialFilter);
    if (targetBtn) {
      targetBtn.click();
    }
  }
}