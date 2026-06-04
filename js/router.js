const templates = {
  home: `
    <div id="band-slider">
      <button type="button" class="slider-btn prev-btn"><i class="fa-solid fa-angle-left"></i></button>
      <button type="button" class="slider-btn next-btn"><i class="fa-solid fa-angle-right"></i></button>

      <div class="slider-wrapper"></div>
    </div>

    <div id="latest-news">
      <div class="section-title">NEWS</div>

      <div class="news-list"></div>

      <a href="#news" class="view-more-btn">VIEW MORE <i class="fa-solid fa-plus"></i></a>
    </div>
  `,
  news: `<div class="news-container"></div>`,
  band: `<div class="band-container"></div>`,
  character: `<div class="character-container"></div>`,
  discography: `<div class="discography-container"></div>`,
  album: `<div class="album-container"></div>`,
};

// 화면 교체 라우터
async function handleRouting() {
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
  } else if (hash.startsWith("discography")) {
    rootDiv.innerHTML = templates.discography;
    initDiscography();
  } else if (hash.startsWith("album")) {
    rootDiv.innerHTML = templates.album;
    initAlbumDetail();
  } else if (templates[hash]) {
    rootDiv.innerHTML = templates[hash];

    if (hash === "home") {
      await initSlider();
      await initLatestNews();
    }
  } else {
    rootDiv.innerHTML = `<h2>404 - 페이지를 찾을 수 없습니다.</h2>`;
  }

  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);
