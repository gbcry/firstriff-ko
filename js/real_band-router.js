function initRealBand() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  const realBandTemplate = `
    <div class="page-view">
      <div class="section-title">ARTIST</div>
      
      <!-- 밴드 탭 메뉴 -->
      <div class="band-tab-menu">
        <img src="images/band/togenashitogeari/background.webp" class="menu-bg-img">
        <a href="#real_band/togenashitogeari" class="band-tab active">
          <img src="images/band/togenashitogeari/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/togenashitogeari/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
        <img src="images/band/cannalily/background.webp" class="menu-bg-img">
        <a href="#real_band/cannalily" class="band-tab">
          <img src="images/band/cannalily/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/cannalily/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
        <img src="images/band/f-272/background.webp" class="menu-bg-img">
        <a href="#real_band/f-272" class="band-tab">
          <img src="images/band/f-272/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/f-272/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      </div>

      <!-- 밴드 소개 구역 (이중 배경) -->
      <div class="real-band-detail-content">
        <div class="real-band-detail-wrapper">
          
          <div class="real-band-hero-banner">
            <img src="images/artist/togenashitogeari/band_main.webp" class="real-band-hero-img">
          </div>

          <div class="real-band-intro-content">
            <!-- 밴드 기본 정보 -->
            <div class="real-band-meta-header">
              <div class="real-band-name">토게나시 토게아리</div>

              <div class="real-band-meta-info">
                <span class="real-meta-item"><span class="real-meta-label">DEBUT:</span> 2023년 5월 29일</span>
                <span class="real-meta-item"><span class="real-meta-label">AGENCY:</span> agehasprings</span>
              </div>

              <div class="real-band-sns-group">
                <a href="https://ageha.agehasprings.com/archives/artist/togenashitogeari" target="_blank" class="real-sns-btn"><i class="fa-solid fa-link"></i></a>
                <a href="https://x.com/girlsbandcry" target="_blank" class="real-sns-btn"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.youtube.com/@girlsbandcry" target="_blank" class="real-sns-btn"><i class="fa-brands fa-youtube"></i></a>
              </div>
            </div>

            <!-- 밴드 멤버 -->
            <div class="real-band-members-section">
              <div class="real-section-subtitle">MEMBER</div>

              <div class="real-band-members-grid">
                <a href="#member/mirei" class="real-member-card">
                  <div class="real-member-thumb-box"><img src="images/artist/togenashitogeari/mirei.webp" class="real-member-img"></div>
                  <div class="real-member-name">미레이</div>
                </a>
                <a href="#member/yuri" class="real-member-card">
                  <div class="real-member-thumb-box"><img src="images/artist/togenashitogeari/yuri.webp" class="real-member-img"></div>
                  <div class="real-member-name">유리</div>
                </a>
                <a href="#member/rina" class="real-member-card">
                  <div class="real-member-thumb-box"><img src="images/artist/togenashitogeari/rina.webp" class="real-member-img"></div>
                  <div class="real-member-name">리나</div>
                </a>
                <a href="#member/natsu" class="real-member-card">
                  <div class="real-member-thumb-box"><img src="images/artist/togenashitogeari/natsu.webp" class="real-member-img"></div>
                  <div class="real-member-name">나츠</div>
                </a>
                <a href="#member/shuri" class="real-member-card">
                  <div class="real-member-thumb-box"><img src="images/artist/togenashitogeari/shuri.webp" class="real-member-img"></div>
                  <div class="real-member-name">슈리</div>
                </a>
              </div>
            </div>

            <!-- 토게토게 서포트 멤버 -->
            <div class="real-support-members-section">
              <div class="real-section-subtitle">SUPPORT MEMBER</div>

              <div class="real-support-members-list">
                  
                <!-- 서포트 멤버 1: 사야 -->
                <div class="real-support-card">
                  <div class="real-support-img-box">
                    <img src="images/artist/togenashitogeari/saya.webp" class="real-support-img">
                  </div>

                  <div class="real-support-info">
                    <div class="real-support-band-tag">토게나시 토게아리</div>

                    <div class="real-support-name-row">
                      <div class="real-support-name-box">
                        <span class="real-support-name-kr">미야우치 사야</span>
                        <span class="real-support-name-jp">宮内沙弥</span>
                      </div>

                      <div class="real-support-sns-group">
                        <a href="https://x.com/deco538" target="_blank" class="real-sns-btn"><i class="fa-brands fa-x-twitter"></i></a>
                      </div>
                    </div>
                    <div class="real-support-position">Support Dr.</div>

                    <div class="real-support-profile">
                      <div class="real-profile-row"><span class="real-label">생일</span><span class="real-value">3월 31일</span></div>
                      <div class="real-profile-row"><span class="real-label">출신지</span><span class="real-value">치바</span></div>
                      <div class="real-profile-row real-live-row">
                        <span class="real-label">참여 라이브</span>
                        <ul class="real-value real-live-list">
                          <li>미레이의 활동 중단 이후, 2024년 '카와사키 100 페스'부터 토게나시 토게아리의 전(全) 라이브 일정에 서포트 멤버로 참여</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 서포트 멤버 2: 쇼코 -->
                <div class="real-support-card">
                  <div class="real-support-img-box">
                    <img src="images/artist/togenashitogeari/shoko.webp" class="real-support-img" alt="나가사키 쇼코">
                  </div>

                  <div class="real-support-info">
                    <div class="real-support-band-tag">토게나시 토게아리</div>
                    <div class="real-support-name-row">
                      <div class="real-support-name-box">
                        <span class="real-support-name-kr">나가사키 쇼코</span>
                        <span class="real-support-name-jp">長﨑祥子</span>
                      </div>

                      <div class="real-support-sns-group">
                        <a href="https://x.com/pon_de_shoko" target="_blank" class="real-sns-btn"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="https://www.instagram.com/pon_de_shoko/" target="_blank" class="real-sns-btn"><i class="fa-brands fa-instagram"></i></a>
                      </div>
                    </div>
                    <div class="real-support-position">Support Key.</div>

                    <div class="real-support-profile">
                      <div class="real-profile-row"><span class="real-label">생일</span><span class="real-value">7월 3일</span></div>
                      <div class="real-profile-row"><span class="real-label">출신지</span><span class="real-value">오사카</span></div>
                      <div class="real-profile-row real-live-row">
                        <span class="real-label">참여 라이브</span>
                        <ul class="real-value real-live-list">
                          <li>4th ONE-MAN LIVE “협주의 울림”</li>
                          <li>5th ONE-MAN LIVE “울림의 순간”</li>
                          <li>“린네의 이치” LIVE IN TAIPEI</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = realBandTemplate;
}