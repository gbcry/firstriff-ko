async function initBand() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  const hash = window.location.hash;

  // 기본값 - 토게토게
  const bandId = hash.split("/")[1] || "togenashitogeari";

  const bands = await fetchBandsData();
  const characters = await fetchCharactersData();

  // 현재 주소와 일치하는 밴드 데이터 찾기
  const currentBand = bands.find((band) => band.id === bandId);

  if (!currentBand) {
    container.innerHTML = "<h2>밴드 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  renderBandView(container, bands, currentBand, characters);
}

// 밴드 소개
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
      const mainName = charInfo ? charInfo.name.main : memberId;
      const thumbImg = charInfo
        ? charInfo.images.thumbnail
        : `images/character/${currentBand.id}/${memberId}_thumb.jpg`;

      return `
        <a href="#character/${memberId}" class="member-card">
          <div class="member-thumb-box">
            <img src="${thumbImg}" class="member-img" loading="lazy">
          </div>
          <div class="member-name">${mainName}</div>
        </a>
      `;
    })
    .join("");

  // 오피셜 미디어 목록
  let mediaHTML = "";

  const allLinks = currentBand.links || [];

  // url에 따라 아이콘 매핑
  const getIconClass = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "fa-brands fa-youtube";
    if (url.includes("x.com") || url.includes("twitter.com")) return "fa-brands fa-x-twitter";
    if (url.includes("instagram.com")) return "fa-brands fa-instagram";
    return "fa-solid fa-link"; // 기본 아이콘
  }

  allLinks.forEach((link) => {
    if (link && link.url) {
      const iconClass = getIconClass(link.url);
      mediaHTML += `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="band-media-btn">
          <i class="${iconClass}"></i>
          <span class="band-media-text">${link.text}</span>
        </a>
      `;
    }
  });

  container.innerHTML = `
    <div class="page-view">
      <div class="section-title">BAND</div>
      
      <div class="band-tab-menu">
        <img src="${currentBand.images.background}" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="band-detail-content">
        <div class="band-detail-wrapper">

          <div class="band-hero-banner">
            <img src="${currentBand.images.main_visual}" class="band-hero-img">
            <img src="${currentBand.images.band_logo}" class="band-hero-logo">
          </div>

          <div class="band-intro-content">
            <div class="band-meta-header">
              <div class="band-name">${currentBand.name}</div>
              <div class="band-description">
                ${introHTML}
              </div>
            </div>

            <div class="band-members-section">
              <div class="section-subtitle">MEMBER</div>
              <div class="band-members-grid">
                ${membersHTML}
              </div>
            </div>

            <div class="band-media-section">
              <div class="section-subtitle">OFFICIAL MEDIA</div>
              <div class="band-media-group">
                ${mediaHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
