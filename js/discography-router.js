async function initDiscography() {
  const container = document.querySelector(".discography-container");

  if (!container) return;

  const hash = window.location.hash;
  const bandId = hash.split("/")[1] || "togenashitogeari";

  const bands = await fetchBandsData();
  const discographyData = await fetchDiscographyData();

  const currentBand = bands.find((band) => band.id === bandId);

  if (!currentBand) {
    container.innerHTML = "<h2>음반 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  const bandAlbums = discographyData[currentBand.id] || [];

  renderDiscographyList(container, bands, currentBand, bandAlbums);
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

async function renderDiscographyList(container, bands, currentBand, bandAlbums) {
  // 밴드 탭
  const tabMenuHTML = bands
    .map((band) => {
      const isActive = band.id === currentBand.id ? "active" : "";

      return `
        <a href="#discography/${band.id}" class="band-tab ${isActive}">
          <img src="${band.images.tab_logo.default}" class="tab-logo-default">
          <img src="${band.images.tab_logo.hover}" class="tab-logo-hover">
        </a>
      `;
    })
    .join("");

  // 앨범 목록 or 빈 화면
  let albumContentHTML = "";
  if (bandAlbums.length === 0) {
    albumContentHTML = `
      <div class="empty-state">
        <p class="empty-text">COMING SOON</p>
      </div>
    `;
  } else {
    const albumCardsHTML = bandAlbums.map((album) => `
      <a href="#album/${album.id}" class="album-card" data-type="${album.album_type}">
        <div class="album-img-wrapper">
          <img src="${album.cover_image}" class="album-cover">
        </div>
        <div class="album-info">
          <div class="album-tag">${album.album_tag}</div>
          <div class="album-name">${album.title.ko}</div>
        </div>
      </a>
    `).join("");

    albumContentHTML = `
      <div class="album-filter-menu">
        <button type="button" class="filter-btn active" data-filter="all">ALL</button>
        <button type="button" class="filter-btn" data-filter="single">SINGLE</button>
        <button type="button" class="filter-btn" data-filter="ep">EP</button>
        <button type="button" class="filter-btn" data-filter="regular">REGULAR</button>
      </div>
      <div class="album-grid">
        ${albumCardsHTML}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="discography-view">
      <div class="section-title">DISCOGRAPHY</div>

      <div class="band-tab-menu">
        <img src="${currentBand.images.background}" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="discography-content">
        ${albumContentHTML}
      </div>
    </div>
  `;

  // 앨범 필터링
  const filterBtns = container.querySelectorAll(".filter-btn");
  const albumCards = container.querySelectorAll(".album-card");

  if (filterBtns.length > 0 && albumCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // 클릭한 버튼에만 active 추가
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // 클릭한 버튼의 필터값
        const filterValue = btn.getAttribute("data-filter");

        albumCards.forEach((card) => {
          const albumType = card.getAttribute("data-type");

          if (filterValue === "all" || filterValue === albumType) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
}