const templates = {
  home: `
    <div id="band-slider">
      <button type="button" class="slider-btn prev-btn"><i class="fa-solid fa-angle-left"></i></button>
      <button type="button" class="slider-btn next-btn"><i class="fa-solid fa-angle-right"></i></button>
      <div class="slider-wrapper">

          <a href="#band/f-272" class="slide-item">
              <img src="images/band/f-272/background.png" class="slide-bg">
              <img src="images/band/f-272/main_visual.webp" data-desktop="images/band/f-272/main_visual.webp"
                  data-mobile="images/band/f-272/band_main.png" class="slide-band">
              <img src="images/band/f-272/band_logo.png" class="slide-logo">
          </a>

          <a href="#band/togenashitogeari" class="slide-item active">
              <img src="images/band/togenashitogeari/background.png" class="slide-bg">
              <img src="images/band/togenashitogeari/main_visual.webp"
                  data-desktop="images/band/togenashitogeari/main_visual.webp"
                  data-mobile="images/band/togenashitogeari/band_main.png" class="slide-band">
              <img src="images/band/togenashitogeari/band_logo.png" class="slide-logo">
          </a>

          <a href="#band/cannalily" class="slide-item">
              <img src="images/band/cannalily/background.png" class="slide-bg">
              <img src="images/band/cannalily/main_visual.webp"
                  data-desktop="images/band/cannalily/main_visual.webp"
                  data-mobile="images/band/cannalily/band_main.png" class="slide-band">
              <img src="images/band/cannalily/band_logo.png" class="slide-logo">
          </a>

          <a href="#band/f-272" class="slide-item">
              <img src="images/band/f-272/background.png" class="slide-bg">
              <img src="images/band/f-272/main_visual.webp" data-desktop="images/band/f-272/main_visual.webp"
                  data-mobile="images/band/f-272/band_main.png" class="slide-band">
              <img src="images/band/f-272/band_logo.png" class="slide-logo">
          </a>

          <a href="#band/togenashitogeari" class="slide-item">
              <img src="images/band/togenashitogeari/background.png" class="slide-bg">
              <img src="images/band/togenashitogeari/main_visual.webp"
                  data-desktop="images/band/togenashitogeari/main_visual.webp"
                  data-mobile="images/band/togenashitogeari/band_main.png" class="slide-band">
              <img src="images/band/togenashitogeari/band_logo.png" class="slide-logo">
          </a>

          <a href="#band/cannalily" class="slide-item">
              <img src="images/band/cannalily/background.png" class="slide-bg">
              <img src="images/band/cannalily/main_visual.webp"
                  data-desktop="images/band/cannalily/main_visual.webp"
                  data-mobile="images/band/cannalily/band_main.png" class="slide-band">
              <img src="images/band/cannalily/band_logo.png" class="slide-logo">
          </a>

      </div>
    </div>

    <div id="latest-news">

      <div class="section-title">NEWS</div>

        <div class="news-list">

            <div class="news-item">
                <a href="#news/20260418_01" class="news-link">
                    <div class="news-date">2026.04.18</div>
                    <div class="news-title">F-272 1st ONE-MAN LIVE The Dissonant “I DOLL” 개최 결정!</div>
                </a>
            </div>

            <div class="news-item">
                <a href="#news/20260322_02" class="news-link">
                    <div class="news-date">2026.03.22</div>
                    <div class="news-title">Canna Lily 1st ONE-MAN LIVE 「새벽녘에 피는 꽃」 개최 결정!</div>
                </a>
            </div>

            <div class="news-item">
                <a href="#news/20260322_01" class="news-link">
                    <div class="news-date">2026.03.22</div>
                    <div class="news-title">AnimeJapan 2026 참가 정보</div>
                </a>
            </div>
            
        </div>
        <a href="#news" class="view-more-btn">VIEW MORE <i class="fa-solid fa-plus"></i></a>
    </div>
  `,
  news: `
  <div class="news-container"></div>
  `,
  band: `<div class="band-container"></div>`,
  character: `<div class="character-container"></div>`,
  discography: `<h2>디스코그래피 페이지 (준비 중)</h2>`,
};

// 화면 교체 라우터
function handleRouting() {
  // 해시 기본값 "home"
  let hash = window.location.hash.replace("#", "") || "home";

  const rootDiv = document.getElementById("main-root");

  // 뉴스 페이지 (목록 || 상세)
  if (hash.startsWith("news")) {
    rootDiv.innerHTML = templates.news;
    initNews();
  } else if (hash.startsWith("band")) {
    rootDiv.innerHTML = templates.band;
    initBand();
  } else if (hash.startsWith("character")) {
    rootDiv.innerHTML = templates.character;
    initCharacter();
  }
  // 홈, 디스코그래피 페이지
  else if (templates[hash]) {
    rootDiv.innerHTML = templates[hash];

    if (hash === "home") {
      initSlider();
    }
  } else {
    rootDiv.innerHTML = `<h2>404 - 페이지를 찾을 수 없습니다.</h2>`;
  }

  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);
