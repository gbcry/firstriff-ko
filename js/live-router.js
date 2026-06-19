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

  const templates = `
    <div class="live-view">
      <div class="section-title">LIVE</div>

      <div class="band-tab-menu">
        <img src="images/band/togenashitogeari/background.png" class="menu-bg-img">
        
        <a href="#live/togenashitogeari" class="band-tab active">
          <img src="images/band/togenashitogeari/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/togenashitogeari/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
        <a href="#live/cannalily" class="band-tab">
          <img src="images/band/cannalily/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/cannalily/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
        <a href="#live/f-272" class="band-tab">
          <img src="images/band/f-272/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/f-272/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      </div>

      <div class="live-detail-content">

        <div class="filter-menu">
          <a href="#live/togenashitogeari/all" class="filter-btn active">ALL</a>
          <a href="#live/togenashitogeari/one-man" class="filter-btn">ONE-MAN</a>
          <a href="#live/togenashitogeari/taiban" class="filter-btn">대반</a>
          <a href="#live/togenashitogeari/etc" class="filter-btn">etc.</a>
        </div>

        <div class="live-detail-wrapper">
        
          <div class="live-hero-banner">
            <img src="images/live/live_toge_1st.webp" class="live-hero-img">
          </div>

          <div class="live-detail-info">
            <h2 class="live-detail-title-main">토게나시 토게아리 1st ONE-MAN LIVE “박명의 서주”</h2>
            <div class="live-detail-title-sub">トゲナシトゲアリ 1st ONE-MAN LIVE “薄明の序奏”</div>

            <div class="live-cast-box">
              <div class="cast-label">CAST</div>
              <div class="cast-group">
                <div class="cast-band-name"><i class="fa-solid fa-diamond"></i> 토게나시 토게아리</div>
                <div class="cast-list">리나 (이세리 니나 役) / 유리 (카와라기 모모카 役) / 미레이 (아와 스바루 役) / 나츠 (에비즈카 토모 役) / 슈리 (루파 役)</div>
              </div>
            </div>
          </div>

          <div class="setlist-wrapper">

            <div class="filter-menu schedule-tab-menu">
              <button class="filter-btn active">Day 1</button>
              <button class="filter-btn">Day 2</button>
            </div>

            <div class="setlist-content-box">

              <div class="schedule-meta-info">
                <div class="meta-item"><i class="fa-regular fa-calendar"></i> 2024.03.16 (土)</div>
                <div class="meta-item"><i class="fa-solid fa-location-dot"></i> KT Zepp Yokohama</div>
              </div>

              <h3 class="setlist-label">SETLIST</h3>

              <div class="setlist-container">
                <div class="setlist-row">
                  <div class="setlist-num">01</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">이름 없는 모든 것</div>
                    <div class="setlist-name-sub">(名もなき何もかも| Nameless Name)</div>
                  </div>
                </div>

                <div class="setlist-row">
                  <div class="setlist-num">02</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">거짓된 법칙</div>
                    <div class="setlist-name-sub">(偽りの理 | no rhyme nor reason)</div>
                  </div>
                </div>

                <div class="setlist-row">
                  <div class="setlist-num">03</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">상처받고 상처주고 아파서 괴로워</div>
                    <div class="setlist-name-sub">(傷つき傷つけ痛くて辛い | Hurtful & Painful)</div>
                  </div>
                </div>

                <div class="setlist-row">
                  <div class="setlist-num">04</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">이상적 패러독스란</div>
                    <div class="setlist-name-sub">(理想的パラドクスとは | Ideal Paradox)</div>
                  </div>
                </div>

                <div class="setlist-row">
                  <div class="setlist-num">05</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">여명을 꿰뚫다</div>
                    <div class="setlist-name-sub">(黎明を穿つ< | Piercing the dawn of time)</div>
                  </div>
                </div>

                <div class="setlist-row">
                  <div class="setlist-num">앙코르 1</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">누구도 될 수 없는 나니까</div>
                    <div class="setlist-name-sub">(誰にもなれない私だから | I'm Nobody)</div>
                  </div>
                </div>

                <div class="setlist-row">
                  <div class="setlist-num">앙코르 2</div>
                  <div class="setlist-text-group">
                    <div class="setlist-name-main">이름 없는 모든 것</div>
                    <div class="setlist-name-sub">(名もなき何もかも | Nameless Name)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div class="back-btn-wrapper">
        <a href="#live/togenashitogeari" class="back-to-list-btn"><i class="fa-solid fa-chevron-left"></i>목록으로 돌아가기</a>
      </div>
    </div>
  `;

  container.innerHTML = templates;
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