async function initRealBand() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  // 기본값 토게토게
  const hash = window.location.hash;
  const bandId = hash.split("/")[1] || "togenashitogeari";

  const realBands = await fetchRealBandsData();
  const artists = await fetchArtistsData();

  // 현재 주소와 일치하는 밴드 데이터 찾기
  const currentBand = realBands.find((band) => band.id === bandId)

  if (!currentBand) {
    container.innerHTML = "<h2>밴드 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  renderRealBandView(container, realBands, currentBand, artists)
}

// 밴드 소개
async function renderRealBandView(container, realBands, currentBand, artists) {

  // sns 아이콘 매핑
  const snsConfig = {
    official_site: "fa-solid fa-link",
    x: "fa-brands fa-x-twitter",
    youtube: "fa-brands fa-youtube",
    instagram: "fa-brands fa-instagram",
    weibo: "fa-brands fa-weibo",
    bilibili: "fa-brands fa-bilibili"
  };

  // 밴드 탭
  const tabMenuHTML = realBands
    .map((band) => {
      const isActive = band.id === currentBand.id ? "active" : "";

      return `
        <a href="#real_band/${band.id}" class="band-tab ${isActive}">
          <img src="images/band/${band.id}/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/${band.id}/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      `;
    })
    .join("");

  // 밴드 공식 sns 링크
  let bandSnsHTML = "";
  if (currentBand.links) {
    bandSnsHTML = Object.entries(currentBand.links)
      .filter(([key, url]) => url) // url이 null이 아닌 것만
      .map(([key, url]) => {
        const iconClass = snsConfig[key] || "fa-solid fa-link";
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="real-sns-btn"><i class="${iconClass}"></i></a>`
      }).join("")
  }

  // 밴드 멤버
  const membersHTML = currentBand.member_ids.map((memberId) => {
    const artist = artists.find((a) => a.id === memberId);
    if (!artist) return "";
    return `
      <a href="#artist/${artist.id}" class="real-member-card">
        <div class="real-member-thumb-box"><img src="${artist.image}" class="real-member-img"></div>
        <div class="real-member-name">${artist.name.main}</div>
      </a>
    `;
  }).join("")

  // 서포트 멤버 (데이터가 있는 경우에만 생성 -> 까나리, 에프니나는 생성 x)
  let supportSectionHTML = "";
  if (currentBand.support_member_ids && currentBand.support_member_ids.length > 0) {
    const supportListHTML = currentBand.support_member_ids.map((supportId) => {
      const support = artists.find((a) => a.id === supportId);
      if (!support) return "";

      // 서포트 멤버 sns
      let supportSnsHTML = "";
      if (support.sns) {
        supportSnsHTML = Object.entries(support.sns)
          .filter(([key, url]) => url) // url이 null이 아닌 것만
          .map(([key, url]) => {
            const iconClass = snsConfig[key] || "fa-solid fa-link";
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="real-sns-btn"><i class="${iconClass}"></i></a>`
          }).join("")
      }

      // 참여 라이브 리스트
      const liveDetail = support.profile.details.find((d) => d.label === "참여 라이브");
      const liveListHTML = liveDetail ? liveDetail.value.map((v) => `<li>${v}</li>`).join("") : "";

      const jpNameHTML = support.name.sub ? `<span class="real-support-name-jp">${support.name.sub}</span>` : "";

      return `
        <div class="real-support-card">
          <div class="real-support-img-box">
            <img src="${support.image}" class="real-support-img">
          </div>
          <div class="real-support-info">
            <div class="real-support-band-tag">${support.band_name}</div>
            <div class="real-support-name-row">
              <div class="real-support-name-box">
                <span class="real-support-name-kr">${support.name.main}</span>
                ${jpNameHTML}
              </div>
              <div class="real-support-sns-group">
                ${supportSnsHTML}
              </div>
            </div>
            <div class="real-support-position">${support.position}</div>
            <div class="real-support-profile">
              <div class="real-profile-row"><span class="real-label">생일</span><span class="real-value">${support.profile.birth}</span></div>
              <div class="real-profile-row"><span class="real-label">출신지</span><span class="real-value">${support.profile.hometown || "미공개"}</span></div>
              <div class="real-profile-row real-live-row">
                <span class="real-label">참여 라이브</span>
                <ul class="real-value real-live-list">
                  ${liveListHTML}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    supportSectionHTML = `
      <div class="real-support-members-section">
        <div class="real-section-subtitle">SUPPORT MEMBER</div>

        <div class="real-support-members-list">
          ${supportListHTML}
        </div>
      </div>
    `;
  }

  // 최종 렌더링
  container.innerHTML = `
    <div class="page-view">
      <div class="section-title">ARTIST</div>
      
      <div class="band-tab-menu">
        <img src="images/band/${currentBand.id}/background.webp" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="real-band-detail-content">
        <div class="real-band-detail-wrapper">
          
          <div class="real-band-hero-banner">
            <img src="${currentBand.band_image}" class="real-band-hero-img">
          </div>

          <div class="real-band-intro-content">
            <!-- 밴드 기본 정보 -->
            <div class="real-band-meta-header">
              <div class="real-band-name">${currentBand.band_name}</div>

              <div class="real-band-meta-info">
                <span class="real-meta-item"><span class="real-meta-label">DEBUT:</span> ${currentBand.debut}</span>
                <span class="real-meta-item"><span class="real-meta-label">AGENCY:</span> ${currentBand.agency}</span>
              </div>

              <div class="real-band-sns-group">
                ${bandSnsHTML}
              </div>
            </div>

            <!-- 밴드 멤버 -->
            <div class="real-band-members-section">
              <div class="real-section-subtitle">MEMBER</div>

              <div class="real-band-members-grid">
                ${membersHTML}
              </div>
            </div>

            <!-- 서포트 멤버 -->
            ${supportSectionHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}