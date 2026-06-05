async function initCharacter() {
  const characterContainer = document.querySelector(".character-container");

  if (!characterContainer) return;

  const hash = window.location.hash;

  const characterId = hash.split("/")[1] || "subaru";

  const characters = await fetchCharactersData();
  const bands = await fetchBandsData();

  const currentChar = characters.find((char) => char.id === characterId);

  if (!currentChar) {
    characterContainer.innerHTML = "<h2>캐릭터 정보를 찾을 수 없습니다.</h2>";
    return;
  }

  const currentBand = bands.find((band) => band.id === currentChar.band_id);

  renderCharacterView(characterContainer, currentChar, currentBand, characters, bands);
}

async function renderCharacterView(container, currentChar, currentBand, characters, bands) {
  // 밴드 탭
  const tabMenuHTML = bands
    .map((band) => {
      return `
        <a href="#band/${band.id}" class="band-tab">
          <img src="${band.images.tab_logo.default}" class="tab-logo-default">
          <img src="${band.images.tab_logo.hover}" class="tab-logo-hover">
        </a>
      `;
    })
    .join("");

  // 소개글
  const introHTML = currentChar.profile.intro_text.map((text) => `<p>${text}</p>`).join("");

  // 프로필 null 체크 & 포맷팅
  const formatVal = (val) => {
    if (val === null || val === undefined || val === "") return "미공개";
    if (Array.isArray(val)) return val.join(" | ")
    return val;
  };

  // 멤버 목록
  const membersHTML = currentBand.member_ids.map((memberId) => {
    const member = characters.find((char) => char.id === memberId);

    const isActive = memberId === currentChar.id ? "active" : "";

    // 방어 코드
    const name = member ? member.name.ko : memberId;
    const position = member ? member.position : "";
    const thumb = member ? member.images.thumbnail : `images/character/${currentBand.id}/${memberId}_thumb.jpg`;

    return `
      <a href="#character/${memberId}" class="character-member-card ${isActive}">
        <img src="${thumb}" class="character-member-img">
        <div class="character-member-info">
          <div class="character-member-part">${position}</div>
          <div class="character-member-name">${name}</div>
        </div>
      </a>
    `;
  }).join("");

  // 오피셜 미디어 목록
  let mediaHTML = "";
  Object.values(currentChar.links).forEach((link) => {
    if (link && link.url) {
      const isYoutube = link.url.includes("youtube.com") || link.url.includes("youtu.be");
      const iconClass = isYoutube ? "youtube" : "sns";

      // sns는 저장된 이미지 사용, 유튜브면 자동 추출
      let thumbImg = link.thumbnail;
      if (!thumbImg && isYoutube) {
        thumbImg = getYouTubeThumbnail(link.url);
      }

      mediaHTML += `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="official-media-link">
          <img src="${thumbImg}" class="official-media-thumb ${iconClass}" onerror="this.style.display='none'">
          <span class="official-media-text">${link.text}</span>
        </a>
      `;
    }
  });

  container.innerHTML = `
    <div class="character-view">

      <div class="section-title">CHARACTER</div>

      <div class="band-tab-menu">
        <img src="${currentBand.images.background}" class="menu-bg-img">
        ${tabMenuHTML}
      </div>

      <div class="character-detail-content">

        <div class="character-visual-box">
          <img src="${currentChar.images.full_body}" class="character-main-img">
        </div>

        <div class="character-info-box">

          <div class="character-name-box">
            <div class="character-part">${currentChar.position}</div>
            <div class="character-name-kr">${currentChar.name.ko} <span class="character-name-jp">(${currentChar.name.ja})</span></div>
          </div>

          <div class="character-desc-box">
            <div class="character-quote">“${currentChar.profile.message}”</div>
            ${introHTML}
          </div>

          <div class="character-profile-box">
            <div class="profile-header">PROFILE</div>

            <div class="profile-table">
              <div class="profile-row">
                <div class="profile-label">나이</div>
                <div class="profile-value">${formatVal(currentChar.profile.age)}</div>
              </div>
              <div class="profile-row">
                <div class="profile-label">생일</div>
                <div class="profile-value">${formatVal(currentChar.profile.birth)}</div>
              </div>
              <div class="profile-row">
                <div class="profile-label">좋아하는 음식</div>
                <div class="profile-value">${formatVal(currentChar.profile.favorite_food)}</div>
              </div>
              <div class="profile-row">
                <div class="profile-label">취미 / 어필 포인트</div>
                <div class="profile-value">${formatVal(currentChar.profile.hobby)}</div>
              </div>
            </div>

            <div class="profile-footer">CV. ${currentChar.cv}</div>
          </div>
        </div>
      </div>

      <div class="section-title">MEMBER</div>
      <div class="character-members-wrapper">
        <div class="character-members-content">
          ${membersHTML}
        </div>
      </div>

      <div class="section-title">OFFICIAL MEDIA</div>
      <div class="official-media-content">
        ${mediaHTML}
      </div>

    </div>
  `;
} 
