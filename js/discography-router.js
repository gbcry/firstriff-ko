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
              <div class="album-tag">1st Single</div>
              <div class="album-name">이름 없는 모든 것</div>
            </div>
          </a>

          <a href="#album/toge_single_02" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/2nd_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <div class="album-tag">2nd Single</div>
              <div class="album-name">우울, 흐려지다</div>
            </div>
          </a>

          <a href="#album/toge_single_03" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/3rd_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <div class="album-tag">3rd Single</div>
              <div class="album-name">망울을 터뜨리다</div>
            </div>
          </a>

          <a href="#album/toge_single_04" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/4th_single.webp" class="album-cover">
            </div>
            <div class="album-info">
              <div class="album-tag">4th Single</div>
              <div class="album-name">극사적 극채색 앤서</div>
            </div>
          </a>

          <a href="#album/toge_ep_01" class="album-card">
            <div class="album-img-wrapper">
              <img src="images/discography/togenashitogeari/1st_ep.webp" class="album-cover">
            </div>
            <div class="album-info">
              <div class="album-tag">1st EP</div>
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

function initAlbumDetail() {
  const albumContainer = document.querySelector(".album-container");

  if (!albumContainer) return;

  const albumTemplate = `
    <div class="discography-view">
      <div class="section-title">DISCOGRAPHY</div>

      <div class="band-tab-menu">
        <img src="images/band/togenashitogeari/background.png" class="menu-bg-img">

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

        <div class="album-detail-wrapper">

          <div class="album-header">
            <div class="album-cover-box">
              <img src="images/discography/togenashitogeari/1st_single.webp">
            </div>

            <div class="album-meta">
              <div class="album-meta-text">
                <div class="album-meta-tag">1st Single</div>
                <div class="album-meta-title-main">이름 없는 모든 것</div>
                <div class="album-meta-title-sub">名もなき何もかも | Nameless Name</div>
              </div>

              <div class="album-meta-release">2023.07.26</div>
            </div>
          </div>

          <div class="tracklist-container">
            <div class="track-row">
              <div class="track-num">01</div>
              <div class="track-text-group">
                <div class="track-name-main">이름 없는 모든 것</div>
                <div class="track-name-sub">(名もなき何もかも | Nameless Name)</div>
              </div>
              <a href="https://youtu.be/ve6SQ3V8BSw" target="_blank" rel="noopener noreferrer" class="track-icon"><i class="fa-brands fa-youtube"></i></a>
            </div>
            <div class="track-row">
              <div class="track-num">02</div>
              <div class="track-text-group">
                <div class="track-name-main">거짓된 법칙</div>
                <div class="track-name-sub">(偽りの理 | no rhyme nor reason)</div>
              </div>
              <a href="https://youtu.be/-GkyvFiAJNg" target="_blank" rel="noopener noreferrer" class="track-icon"><i class="fa-brands fa-youtube"></i></a>
            </div>
            <div class="track-row">
              <div class="track-num">03</div>
              <div class="track-text-group">
                <div class="track-name-main"">이름 없는 모든 것 (Instrumental)</div>
              </div>
              <a href="https://youtu.be/-GkyvFiAJNg" target="_blank" rel="noopener noreferrer" class="track-icon"><i class="fa-brands fa-youtube"></i></a>
            </div>
            <div class="track-row">
              <div class="track-num">04</div>
              <div class="track-text-group">
                <div class="track-name-main"">거짓된 법칙 (Instrumental)</div>
              </div>
              <a href="https://youtu.be/-GkyvFiAJNg" target="_blank" rel="noopener noreferrer" class="track-icon"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </div>

      </div>

      <div class="section-title">OFFICIAL MEDIA</div>

      <div class="official-media-content">
        <a href="https://youtu.be/dDwN4MgcIlU?si=PbgXcxOLOKrPGfw-" target="_blank" rel="noopener noreferrer" class="official-media-link">
          <img src="images/discography/togenashitogeari/nameless_name_mv_thumb.jpg" class="official-media-thumb youtube">
          <span class="official-media-text">이름 없는 모든 것 MV</span>
        </a>
        <a href="https://youtu.be/WrWga0k-fzE" target="_blank" rel="noopener noreferrer" class="official-media-link">
          <img src="images/discography/togenashitogeari/episode7_thumb.jpg" class="official-media-thumb youtube">
          <span class="official-media-text">애니메이션 7화 라이브</span>
        </a>
        <a href="https://youtu.be/LgoRQSPS-3Y?si=FgUO8L_KBNPBbeI5" target="_blank" rel="noopener noreferrer" class="official-media-link">
            <img src="images/discography/togenashitogeari/no_rhyme_nor_reason_mv_thumb.jpg"  class="official-media-thumb youtube">
          <span class="official-media-text">거짓된 법칙 MV</span>
        </a>
      </div>

      <div class="back-btn-wrapper">
        <a href="#discography/togenashitogeari" class="back-to-list-btn"><i class="fa-solid fa-chevron-left"></i>목록으로 돌아가기</a>
      </div>
    </div>
  `;

  albumContainer.innerHTML = albumTemplate;
}
