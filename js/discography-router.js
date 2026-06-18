async function initDiscography() {
  const container = document.querySelector(".discography-container");

  if (!container) return;

  const hash = window.location.hash;
  const parts = hash.replace("#", "").split("/");
  const bandId = parts[1] || "togenashitogeari";
  const initialFilter = parts[2] || "all";

  const bands = await fetchBandsData();
  const discographyData = await fetchDiscographyData();

  const currentBand = bands.find((band) => band.id === bandId);

  if (!currentBand) {
    container.innerHTML = "<h2>음반 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  const bandAlbums = discographyData[currentBand.id] || [];

  renderDiscographyList(container, bands, currentBand, bandAlbums, initialFilter);
}

async function initAlbumDetail() {
  const container = document.querySelector(".album-container");

  if (!container) return;

  const hash = window.location.hash;
  const albumId = hash.split("/")[1];

  if (!albumId) return;

  const bands = await fetchBandsData();
  const discographyData = await fetchDiscographyData();

  let currentAlbum = null;
  let currentBand = null;

  // 앨범 id가 어느 밴드에 있는지 조회
  for (const [bandId, albums] of Object.entries(discographyData)) {
    if (Array.isArray(albums)) {
      const foundAlbum = albums.find((album) => album.id === albumId);

      if (foundAlbum) {
        currentAlbum = foundAlbum;
        currentBand = bands.find((band) => band.id === bandId);
        break;
      }
    }
  }

  if (!currentAlbum || !currentBand) {
    albumContainer.innerHTML = "<h2>앨범 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  renderAlbumDetailView(container, bands, currentBand, currentAlbum);
}

async function renderDiscographyList(container, bands, currentBand, bandAlbums, initialFilter) {
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
      <div class="filter-menu">
        <a href="#discography/${currentBand.id}" class="filter-btn active" data-filter="all">ALL</a>
        <a href="#discography/${currentBand.id}" class="filter-btn" data-filter="single">SINGLE</a>
        <a href="#discography/${currentBand.id}" class="filter-btn" data-filter="ep">EP</a>
        <a href="#discography/${currentBand.id}" class="filter-btn" data-filter="regular">REGULAR</a>
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
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // 클릭한 버튼에만 active 추가
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // 클릭한 버튼의 필터값
        const filterValue = btn.getAttribute("data-filter");

        // 브라우저 주소창 url을 현재 필터에 맞춰서 변경
        history.replaceState(null, null, `#discography/${currentBand.id}/${filterValue}`);

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

    // HTML 렌더링 후 필터와 일치하는 버튼으로 강제 클릭 이벤트 발생
    const targetBtn = Array.from(filterBtns).find(btn => btn.getAttribute("data-filter") === initialFilter);
    if (targetBtn) {
      targetBtn.click();
    }
  }
}

async function renderAlbumDetailView(container, bands, currentBand, currentAlbum) {
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

  // 앨범 부제목
  const subTitles = [];

  if (currentAlbum.title.ja) subTitles.push(currentAlbum.title.ja);
  if (currentAlbum.title.en) subTitles.push(currentAlbum.title.en);

  const subTitleHTML = subTitles.length > 0 ? `<div class="album-meta-title-sub">${subTitles.join(" | ")}</div>` : "";

  // 트랙 리스트 & 오피셜 미디어
  let tracklistHTML = "";
  let mediaHTML = "";

  currentAlbum.tracklist.forEach((track) => {
    const trackNum = String(track.track_no).padStart(2, "0");

    // 트랙 부제목
    const trackSub = [];

    if (track.title.ja) trackSub.push(track.title.ja);
    if (track.title.en) trackSub.push(track.title.en);

    const trackSubHTML = trackSub.length > 0 ? `<div class="track-name-sub">(${trackSub.join(" | ")})</div>` : "";

    // 유튜브 아이콘 유무 확인
    const audioIconHTML = track.links && track.links.audio && track.links.audio.url ?
      `<a href="${track.links.audio.url}" target="_blank" rel="noopener noreferrer" class="track-icon"><i class="fa-brands fa-youtube"></i></a>` : "";

    tracklistHTML += `
      <div class="track-row">
        <div class="track-num">${trackNum}</div>
        <div class="track-text-group">
          <div class="track-name-main">${track.title.ko}</div>
          ${trackSubHTML}
        </div>
        ${audioIconHTML}
      </div>
    `;

    // 오피셜 미디어
    if (track.links) {
      if (track.links.mv && track.links.mv.url) {
        mediaHTML += `
          <a href="${track.links.mv.url}" target="_blank" rel="noopener noreferrer" class="official-media-link">
            <img src="${getYouTubeThumbnail(track.links.mv.url)}" class="official-media-thumb youtube" onerror="this.style.display='none'">
            <span class="official-media-text">${track.links.mv.text}</span>
          </a>
        `;
      }
      if (track.links.anime && track.links.anime.url) {
        mediaHTML += `
          <a href="${track.links.anime.url}" target="_blank" rel="noopener noreferrer" class="official-media-link">
            <img src="${getYouTubeThumbnail(track.links.anime.url)}" class="official-media-thumb youtube" onerror="this.style.display='none'">
            <span class="official-media-text">${track.links.anime.text}</span>
          </a>
        `;
      }
    }
  });

  let officialMediaSection = "";

  // 미디어 구역에 내용이 없으면 렌더링 x
  if (mediaHTML.trim() !== "") {
    officialMediaSection = `
      <div class="section-title">OFFICIAL MEDIA</div>
      <div class="official-media-content">
        ${mediaHTML}
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
        <div class="filter-menu">
          <a href="#discography/${currentBand.id}/all" class="filter-btn">ALL</a>
          <a href="#discography/${currentBand.id}/single" class="filter-btn">SINGLE</a>
          <a href="#discography/${currentBand.id}/ep" class="filter-btn">EP</a>
          <a href="#discography/${currentBand.id}/regular" class="filter-btn">REGULAR</a>
        </div>

        <div class="album-detail-wrapper">

          <div class="album-header">
            <div class="album-cover-box">
              <img src="${currentAlbum.cover_image}">
            </div>

            <div class="album-meta">
              <div class="album-meta-text">
                <div class="album-meta-tag">${currentAlbum.album_tag}</div>
                <div class="album-meta-title-main">${currentAlbum.title.ko}</div>
                ${subTitleHTML}
              </div>

              <div class="album-meta-release">${currentAlbum.release_date}</div>
            </div>
          </div>

          <div class="tracklist-container">
            ${tracklistHTML}
          </div>
        </div>

      </div>

      ${officialMediaSection}

      <div class="back-btn-wrapper">
        <a href="#discography/${currentBand.id}" class="back-to-list-btn"><i class="fa-solid fa-chevron-left"></i>목록으로 돌아가기</a>
      </div>
    </div>
  `;
}