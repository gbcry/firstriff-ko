async function initBand() {
  const bandContainer = document.querySelector(".band-container");

  if (!bandContainer) return;

  const hash = window.location.hash;

  // 기본값 - 토게토게
  const bandId = hash.split("/")[1] || "togenashitogeari";

  const bands = await fetchBandsData();
  const characters = await fetchCharactersData();

  // 현재 주소와 일치하는 밴드 데이터 찾기
  const currentBand = bands.find((band) => band.id === bandId);

  if (!currentBand) {
    bandContainer.innerHTML = "<h2>밴드 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  renderBandView(bandContainer, bands, currentBand, characters);
}

async function renderBandView(container, bands, currentBand, characters) {
  // 밴드 탭
  const tabMenuHTML = bands
    .map((band) => {
      const isActive = band.id === currentBand.id ? "active" : "";

      return `
        <a href="#band/${band.id}" class="band-tab ${isActive}">
          <img src="${band.images.tab_logo.default}" class="tab-logo-default">
          <img src="${band.images.tab_logo.hover}" class="tab-logo-hover">
        </a>
      `;
    })
    .join("");

  // 소개글
  const introHTML = currentBand.introduction
    .map((text) => `<p>${text}</p>`)
    .join("");

  // 멤버 목록
  const membersHTML = currentBand.member_ids
    .map((memberId) => {
      const charInfo = characters.find((char) => char.id === memberId);

      const krName = charInfo ? charInfo.name.ko : memberId;
      const thumbImg = charInfo
        ? charInfo.images.thumbnail
        : `images/character/${currentBand.id}/${memberId}_thumb.jpg`;

      return `
        <a href="#character/${memberId}" class="member-card">
          <img src="${thumbImg}" class="member-img">
          <div class="member-name">${krName}</div>
        </a>
      `;
    })
    .join("");

  // 오피셜 미디어 목록
  let mediaHTML = "";
  if (currentBand.links.official_sns) {
    mediaHTML += currentBand.links.official_sns
      .map(
        (sns) => `
          <a href="${sns.url}" target="_blank" rel="noopener noreferrer" class="official-media-link">
            <img src="${sns.thumbnail}" class="official-media-thumb sns">
            <span class="official-media-text">${sns.text}</span>
          </a>
        `,
      )
      .join("");
  }

  // 첫 생방송
  if (
    currentBand.links.first_streaming &&
    currentBand.links.first_streaming.url
  ) {
    const ytThumb = getYouTubeThumbnail(currentBand.links.first_streaming.url);
    mediaHTML += `
      <a href="${currentBand.links.first_streaming.url}" target="_blank" rel="noopener noreferrer" class="official-media-link">
        <img src="${ytThumb}" class="official-media-thumb youtube" onerror="this.style.display='none'">
        <span class="official-media-text">${currentBand.links.first_streaming.text}</span>
      </a> 
    `;
  }

  // 데뷔 PV
  if (currentBand.links.debut_pv && currentBand.links.debut_pv.url) {
    const ytThumb = getYouTubeThumbnail(currentBand.links.debut_pv.url);
    mediaHTML += `
      <a href="${currentBand.links.debut_pv.url}" target="_blank" rel="noopener noreferrer" class="official-media-link">
        <img src="${ytThumb}" class="official-media-thumb youtube" onerror="this.style.display='none'">
        <span class="official-media-text">${currentBand.links.debut_pv.text}</span>
      </a> 
    `;
  }

  container.innerHTML = `
    <div class="band-view">

      <div class="section-title">BAND</div>
      
      <div class="band-tab-menu">
        <img src="${currentBand.images.background}" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="band-detail-content">

        <div class="band-visual-box">
          <img src="${currentBand.images.band_main}" class="band-main-img">
          <img src="${currentBand.images.band_logo}" class="band-logo">
        </div>

        <div class="band-info-box">
          <div class="band-name">${currentBand.name}</div>
          <div class="band-description">
            ${introHTML}
          </div>

          <div class="band-members">
            <div class="member-label">MEMBER</div>
            ${membersHTML}
          </div>
        </div>
        
      </div>

      <div class="section-title">OFFICIAL MEDIA</div>

      <div class="official-media-content">        
        ${mediaHTML}
      </div>
      
    </div>
  `;
}
