async function initCharacter() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  const hash = window.location.hash;

  const characterId = hash.split("/")[1] || "subaru";

  const characters = await fetchCharactersData();
  const bands = await fetchBandsData();
  const artists = await fetchArtistsData();

  const currentChar = characters.find((char) => char.id === characterId);

  if (!currentChar) {
    container.innerHTML = "<h2>캐릭터 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  const currentBand = bands.find((band) => band.id === currentChar.band_id);

  renderCharacterView(container, currentChar, currentBand, characters, bands, artists);
}

async function renderCharacterView(container, currentChar, currentBand, characters, bands, artists) {
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

  // 캐릭터 기본 정보 & 소개글
  const jpNameHTML = currentChar.name.sub ? `<span class="character-name-sub">${currentChar.name.sub}</span>` : "";
  const introHTML = currentChar.profile.intro_text.map((text) => `<p>${text}</p>`).join("");

  // 프로필
  const detailsHTML = currentChar.profile.details && currentChar.profile.details.length > 0
    ? currentChar.profile.details.map((detail) => {
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

  // 밴드 멤버
  const membersHTML = currentBand.member_ids.map((memberId) => {
    const member = characters.find((char) => char.id === memberId);
    if (!member) return "";
    return `
      <a href="#character/${memberId}" class="member-card">
        <div class="member-thumb-box"><img src="${member.images.thumbnail}" class="member-img" loading="lazy"></div>
        <div class="member-name">${member.name.main}</div>
      </a>
    `;
  }).join("")

  // 오피셜 미디어 목록
  let mediaHTML = "";
  if (currentChar.links) {
    Object.values(currentChar.links).forEach((link) => {
      if (link && link.url) {
        mediaHTML += `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="video-link">
            <img src="${getYouTubeThumbnail(link.url)}" class="video-thumb" onerror="this.style.display='none'" loading="lazy">
            <span class="video-text">${link.text}</span>
          </a>
        `;
      }
    });
  }

  let videoSection = "";

  // 미디어 구역에 내용이 없으면 렌더링 x
  if (mediaHTML.trim() !== "") {
    videoSection = `
    <div class="character-videos-section">
      <div class="section-subtitle">VIDEO</div>
      <div class="video-grid">
        ${mediaHTML}
      </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="page-view">
      <div class="section-title">CHARACTER</div>
      <div class="band-tab-menu">
        <img src="${currentBand.images.background}" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="band-detail-content">
        <div class="band-detail-wrapper">
          <div class="character-profile-layout">

            <div class="character-top-row">
              <div class="character-visual-box">
                <div class="character-img-wrapper">
                  <img src="${currentChar.images.thumbnail}" class="character-main-img">
                  <button class="img-expand-btn" id="expand-img-btn">
                    <i class="fa-solid fa-expand"></i>
                  </button>
                </div>
              </div>

              <div class="character-info-box">
                <div class="character-name-header">
                  <div class="character-band-row">
                    <div class="character-band-tag">${currentChar.band_name}</div>
                    <div class="character-position">${currentChar.position}</div>
                  </div>

                  <div class="character-name-row">
                    <div class="character-name-box">
                      <span class="character-name-main">${currentChar.name.main}</span>
                      ${jpNameHTML}
                    </div>
                  </div>
                </div>

                <div class="character-desc-box">
                  <div class="character-quote">${currentChar.profile.message}</div>
                  ${introHTML}
                </div>

                <a href="#artist/${currentChar.cv.id}" class="character-cv-link">
                  <span class="link-label">CV.</span>
                  <span class="link-value">${currentChar.cv.name} <i class="fa-solid fa-chevron-right"></i></span>
                </a>
              </div>
              
            </div>

          <div class="character-profile-details">
            <div class="profile-row"><span class="label">나이</span><span class="value">${currentChar.profile.age}</span></div>
            <div class="profile-row"><span class="label">생일</span><span class="value">${currentChar.profile.birth || "미공개"}</span></div>
            ${detailsHTML}
          </div>
        </div>

        <div class="character-members-section">
          <div class="section-subtitle">MEMBER</div>
          <div class="band-members-grid">
            ${membersHTML}
          </div>
        </div>

        ${videoSection}

        </div>
      </div>
    </div>

    <div class="image-modal" id="character-image-modal">
      <div class="modal-close-btn" id="close-image-modal"><i class="fa-solid fa-xmark"></i></div>
      <img src="${currentChar.images.full_body}" class="modal-full-img" loading="lazy">
    </div>
  `;

  const expandBtn = container.querySelector("#expand-img-btn");
  const imageModal = container.querySelector("#character-image-modal");
  const closeBtn = container.querySelector("#close-image-modal");

  if (expandBtn && imageModal && closeBtn) {
    expandBtn.addEventListener("click", () => {
      imageModal.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      imageModal.classList.remove("active");
    });

    // 배경 클릭 시 닫기
    imageModal.addEventListener("click", (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove("active");
      }
    });
  }
} 
