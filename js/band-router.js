function initBand() {
  const bandContainer = document.querySelector(".band-container");

  if (!bandContainer) return;

  const hash = window.location.hash;

  // 기본값 - 토게토게
  const bandId = hash.split("/")[1] || "togenashitogeari";

  // 밴드 페이지 화면
  const bandTemplate = `
    <div class="band-view">

      <div class="section-title">BAND</div>
      
      <div class="band-tab-menu">
        <img src="images/band/${bandId}/background.png" class="menu-bg-img">

        <a href="#band/togenashitogeari" class="band-tab ${bandId === "togenashitogeari" ? "active" : ""}">
          <img src="images/band/togenashitogeari/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/togenashitogeari/tab_logo_hover.webp" class="tab-logo-hover">
        </a>

        <a href="#band/cannalily" class="band-tab ${bandId === "cannalily" ? "active" : ""}">
          <img src="images/band/cannalily/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/cannalily/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
        
        <a href="#band/f-272" class="band-tab ${bandId === "f-272" ? "active" : ""}">
          <img src="images/band/f-272/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/f-272/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      </div>

      <div class="band-detail-content">

        <div class="band-visual-box">
          <img src="images/band/togenashitogeari/band_main.png" class="band-main-img">
          <img src="images/band/togenashitogeari/band_logo.png" class="band-logo">
        </div>

        <div class="band-info-box">
          <div class="band-name">토게나시 토게아리</div>
          <div class="band-description">
            <p>억눌린 마음을 품은 5명에 의한 걸즈 밴드.</p>
            <p>감정적이고 질주감 넘치는 록 사운드가 특징이다.</p>
            <p>벽에 부딪히면서도, 자신들의 음악이 가진 힘을 믿고 돌진해 나간다.</p>
          </div>

          <div class="band-members">
            <div class="member-label"><i class="fa-solid fa-diamond"></i>MEMBER</div>

            <div class="member-card">
              <img src="images/character/togenashitogeari/subaru_thumb.jpg" class="member-img">
              <div class="member-name">아와 스바루</div>
            </div>

            <div class="member-card">
              <img src="images/character/togenashitogeari/momoka_thumb.jpg" class="member-img">
              <div class="member-name">카와라기 모모카</div>
            </div>

            <div class="member-card">
              <img src="images/character/togenashitogeari/nina_thumb.jpg" class="member-img">
              <div class="member-name">이세리 니나</div>
            </div>

            <div class="member-card">
              <img src="images/character/togenashitogeari/tomo_thumb.jpg" class="member-img">
              <div class="member-name">에비즈카 토모</div>
            </div>

            <div class="member-card">
              <img src="images/character/togenashitogeari/rupa_thumb.jpg" class="member-img">
              <div class="member-name">루파</div>
             </div>
          </div>
        </div>
        
      </div>

      <div class="section-title">OFFICIAL MEDIA</div>

      <div class="band-media-content">
        <img src="images/band/togenashitogeari/media_visual.jpeg" class="band-media-img">
        
        <div class="media-link-group">
          <a href="https://x.com/girlsbandcry" target="_blank" class="media-link">[ 걸즈 밴드 크라이 공식 X ]</a>
          <a href="https://www.instagram.com/toge0toge1/" target="_blank" class="media-link">[ 토게나시 토게아리 공식 인스타그램 ]</a> 
          <a href="https://www.youtube.com/live/UF_8DR9-9cY?si=Dfr5r-QEMxq3iCgL" target="_blank" class="media-link">[ 토게나시 토게아리 첫 생방송 ]</a> 
        </div>
      </div>
      
    </div>
  `;

  bandContainer.innerHTML = bandTemplate;
}
