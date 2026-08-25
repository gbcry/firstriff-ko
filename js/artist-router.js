async function initArtist() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  const templates = `
    <div class="page-view">
      <div class="section-title">ARTIST</div>

      <div class="band-tab-menu">
        <img src="images/band/togenashitogeari/background.webp" class="menu-bg-img">
        <a href="#real_band/togenashitogeari" class="band-tab active">
          <img src="images/band/togenashitogeari/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/togenashitogeari/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      </div>

      <div class="band-detail-content">
        <div class="band-detail-wrapper">

          <div class="artist-profile-layout">
            <div class="artist-visual-box">
              <img src="images/artist/togenashitogeari/mirei.webp" class="artist-main-img">
            </div>

            <div class="artist-info-box">
              <div class="artist-name-header">
                <div class="artist-band-row">
                  <div class="artist-band-tag">토게나시 토게아리</div>
                  <div class="artist-position">Dr.</div>
                </div>

                <div class="artist-name-row">
                  <div class="artist-name-box">
                    <span class="artist-name-main">미레이</span>
                    <span class="artist-name-sub">美怜</span>
                  </div>
                  
                  <div class="artist-sns-group">
                    <a href="https://twitter.com/mirei_togetoge" target="_blank" rel="noopener noreferrer" class="sns-btn"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.instagram.com/mirei_togetoge/" target="_blank" rel="noopener noreferrer" class="sns-btn"><i class="fa-brands fa-instagram"></i></a>
                  </div>
                </div>
              </div>

              <a href="#character/subaru" class="artist-character-link">
                <span class="link-label">담당 캐릭터</span>
                <span class="link-value">아와 스바루 <i class="fa-solid fa-chevron-right"></i></span>
              </a>

              <div class="artist-profile-details">
                <div class="profile-row"><span class="label">생일</span><span class="value">2003년 11월 7일</span></div>
                <div class="profile-row"><span class="label">출신지</span><span class="value">카나가와</span></div>
                <div class="profile-row"><span class="label">취미</span><span class="value">맛있어 보이는 식당 찾기</span></div>
                <div class="profile-row"><span class="label">특기</span><span class="value">찾은 식당이 대체로 맛있는 것</span></div>
                <div class="profile-row"><span class="label">좋아하는 아티스트</span><span class="value">험브레더스 | King Gnu</span></div>
                <div class="profile-row"><span class="label">좋아하는 애니/만화</span><span class="value">원피스 | 주술회전 | BANANA FISH | 강철의 연금술사 | FAIRY TAIL | 약속의 네버랜드 | 장송의 프리렌</span></div>
                <div class="profile-row"><span class="label">좋아하는 음식</span><span class="value">단 것 | 고기</span></div>
              </div>

            </div>
          </div>

          <div class="artist-members-section">
            <div class="section-subtitle">MEMBER</div>
            <div class="band-members-grid">
              <!-- 멤버 카드 예시 -->
              <a href="#artist/mirei" class="member-card">
                <div class="member-thumb-box"><img src="images/artist/togenashitogeari/mirei.webp" class="member-img"></div>
                <div class="member-name">미레이</div>
              </a>
              <a href="#artist/yuri" class="member-card">
                <div class="member-thumb-box"><img src="images/artist/togenashitogeari/yuri.webp" class="member-img"></div>
                <div class="member-name">유리</div>
              </a>
              <!-- 나머지 멤버 생략 -->
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  container.innerHTML = templates;
}