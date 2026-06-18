function initLiveEvent() {
  const liveContainer = document.querySelector(".live-container");

  if (!liveContainer) return;

  const liveTemplate = `
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

            <a href="#live/f_272" class="band-tab">
              <img src="images/band/f-272/tab_logo_default.webp" class="tab-logo-default">
              <img src="images/band/f-272/tab_logo_hover.webp" class="tab-logo-hover">
            </a>
          </div>

          <div class="live-content">
            <div class="filter-menu">
              <button type="button" class="filter-btn active" data-filter="all">ALL</button>
              <button type="button" class="filter-btn" data-filter="one-man">ONE-MAN</button>
              <button type="button" class="filter-btn" data-filter="taiban">대반</button>
              <button type="button" class="filter-btn" data-filter="etc">etc.</button>
            </div>

            <div class="live-grid">

              <div class="live-card" data-band="togenashitogeari" data-type="one-man">
                <div class="live-img-box">
                  <img src="images/live/live_toge_promotion.webp" class="live-kv-img">
                </div>
                <div class="live-info-box">
                  <span class="live-date">2023.09.14 (木)</span>
                  <h3 class="live-title">토게나시 토게아리 수행 중! 공개 연습 라이브</h3>
                </div>
              </div>

              <div class="live-card" data-band="togenashitogeari" data-type="one-man">
                <div class="live-img-box">
                  <img src="images/live/live_toge_1st.webp" class="live-kv-img">
                </div>
                <div class="live-info-box">
                  <span class="live-date">2024.03.16 (土)</span>
                  <h3 class="live-title">토게나시 토게아리 1st ONE-MAN LIVE “박명의 서주”</h3>
                </div>
              </div>

              <div class="live-card" data-band="cannalily" data-type="one-man">
                <div class="live-img-box">
                  <img src="images/live/live_cannalily_1st.jpeg" class="live-kv-img">
                </div>
                <div class="live-info-box">
                  <span class="live-date">2026.06.26 (金)</span>
                  <h3 class="live-title">Canna Lily 1st ONE-MAN LIVE「새벽녘에 피는 꽃」</h3>
                </div>
              </div>

              <div class="live-card" data-band="f-272" data-type="one-man">
                <div class="live-img-box">
                  <div class="no-img-placeholder">NO IMAGE</div>
                </div>
                <div class="live-info-box">
                  <span class="live-date">2026.07.20 (月・공휴일)</span>
                  <h3 class="live-title">F-272 1st ONE-MAN LIVE The Dissonant “I DOLL“</h3>
                </div>
              </div>

            </div>
          </div>
      </div>
    `;

  liveContainer.innerHTML = liveTemplate;
}