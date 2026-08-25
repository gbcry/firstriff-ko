async function initArtist() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  // 기본값 미레이
  const hash = window.location.hash;
  const artistId = hash.split("/")[1] || "mirei";

  const realBands = await fetchRealBandsData();
  const artists = await fetchArtistsData();

  // 현재 주소와 일치하는 아티스트 데이터 찾기
  const currentArtist = artists.find((artist) => artist.id === artistId)

  if (!currentArtist) {
    container.innerHTML = "<h2>아티스트 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  const currentBand = realBands.find((band) => band.id === currentArtist.band_id);

  renderArtistView(container, currentArtist, currentBand, artists, realBands)
}

async function renderArtistView(container, currentArtist, currentBand, artists, realBands) {
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

  // 아티스트 sns 링크
  let artistSnsHTML = "";
  if (currentArtist.sns) {
    artistSnsHTML = Object.entries(currentArtist.sns)
      .filter(([key, url]) => url) // url이 null이 아닌 것만
      .map(([key, url]) => {
        const iconClass = snsConfig[key] || "fa-solid fa-link";
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="sns-btn"><i class="${iconClass}"></i></a>`
      }).join("")
  }

  // 밴드 멤버
  const membersHTML = currentBand.member_ids.map((memberId) => {
    const artist = artists.find((a) => a.id === memberId);
    if (!artist) return "";
    return `
      <a href="#artist/${artist.id}" class="member-card">
        <div class="member-thumb-box"><img src="${artist.image.thumbnail}" class="member-img"></div>
        <div class="member-name">${artist.name.main}</div>
      </a>
    `;
  }).join("")

  const jpNameHTML = currentArtist.name.sub ? `<span class="artist-name-sub">${currentArtist.name.sub}</span>` : "";

  // 프로필
  const detailsHTML = currentArtist.profile.details && currentArtist.profile.details.length > 0
    ? currentArtist.profile.details.map((detail) => {
      const valueStr = Array.isArray(detail.value)
        ? detail.value.join(" | ")
        : detail.value;
      return `
        <div class="profile-row">
          <span class="label">${detail.label}</span><span class="value">${valueStr}</span>
        </div>
      `;
    }).join("")
    : "";

  // 최종 렌더링
  container.innerHTML = `
    <div class="page-view">
      <div class="section-title">ARTIST</div>

      <div class="band-tab-menu">
        <img src="images/band/${currentBand.id}/background.webp" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="band-detail-content">
        <div class="band-detail-wrapper">

          <div class="artist-profile-layout">
            <div class="artist-visual-box">
              <img src="${currentArtist.image.main_visual}" class="artist-main-img">
            </div>

            <div class="artist-info-box">
              <div class="artist-name-header">
                <div class="artist-band-row">
                  <div class="artist-band-tag">${currentArtist.band_name}</div>
                  <div class="artist-position">${currentArtist.position}</div>
                </div>

                <div class="artist-name-row">
                  <div class="artist-name-box">
                    <span class="artist-name-main">${currentArtist.name.main}</span>
                    ${jpNameHTML}
                  </div>
                  
                  <div class="artist-sns-group">
                    ${artistSnsHTML}
                  </div>
                </div>
              </div>

              <a href="#character/${currentArtist.character.id}" class="artist-character-link">
                <span class="link-label">담당 캐릭터</span>
                <span class="link-value">${currentArtist.character.name} <i class="fa-solid fa-chevron-right"></i></span>
              </a>

              <div class="artist-profile-details">
                <div class="profile-row"><span class="label">생일</span><span class="value">${currentArtist.profile.birth}</span></div>
                <div class="profile-row"><span class="label">출신지</span><span class="value">${currentArtist.profile.hometown || "미공개"}</span></div>
                ${detailsHTML}
              </div>

            </div>
          </div>

          <div class="artist-members-section">
            <div class="section-subtitle">MEMBER</div>
            <div class="band-members-grid">
              ${membersHTML}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}