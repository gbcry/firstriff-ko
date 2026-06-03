function initDiscography() {
  const discographyContainer = document.querySelector(".discography-container");

  if (!discographyContainer) return;

  const discographyTemplate = `
    <div class="discography-view">
      <div class="section-title">DISCOGRAPHY</div>

      <div class="band-tab-menu">
        <img src="images/band/togenashitogeari/background.png" class="menu-bg-img"">

        <a href="#discography/togenashitogeari" class="band-tab active">
          <img src="images/band/togenashitogeari/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/togenashitogeari/tab_logo_hover.webp" class="tab-logo-hover">
        </a>

        <a href="#discography/cannalily" class="band-tab">
          <img src="images/band/cannalily/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/cannalily/tab_logo_hover.webp" class="tab-logo-hover">
        </a>


        <a href="#discography/f_272" class="band-tab">
          <img src="images/band/f-272/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/f-272/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      </div>

      <div class="discography-content">

        <div class="album-filter-menu">
          <button type="button" class="filter-btn active" data-filter="all">ALL</button>
          <button type="button" class="filter-btn" data-filter="single">SINGLE</button>
          <button type="button" class="filter-btn" data-filter="ep">EP</button>
          <button type="button" class="filter-btn" data-filter="regular">REGULAR</button>
        </div>

        <div class="album-grid">

          <a href="#album/toge_single_01" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/1st_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <span class="album-tag">1st Single</span>
              <div class="album-name">이름 없는 모든 것</div>
            </div>
          </a>

          <a href="#album/toge_single_02" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/2nd_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <span class="album-tag">2nd Single</span>
              <div class="album-name">우울, 흐려지다</div>
            </div>
          </a>

          <a href="#album/toge_single_03" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/3rd_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <span class="album-tag">3rd Single</span>
              <div class="album-name">망울을 터뜨리다</div>
            </div>
          </a>

          <a href="#album/toge_single_04" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/4th_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <span class="album-tag">4th Single</span>
              <div class="album-name">극사적 극채색 앤서</div>
            </div>
          </a>

          <a href="#album/toge_ep_01" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/1st_ep.webp" class="album-cover">
            </div>
            <div class="album-info">
              <span class="album-tag">1st EP</span>
              <div class="album-name">새끼손가락 세우지 않을래요?</div>
            </div>
          </a>

          </div>

        <div class="empty-state hidden">
          <p class="empty-text">COMING SOON</p>
        </div>
      </div>
</div>
  `;

  discographyContainer.innerHTML = discographyTemplate;
}
