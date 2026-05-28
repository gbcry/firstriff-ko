function initNews() {
  const newsContainer = document.querySelector(".news-container");

  if (!newsContainer) return;

  const hash = window.location.hash;

  // 뉴스 목록 화면
  const newsListTemplate = `
  <div class="news-list-view">
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
  </div>
  `;

  if (!hash || hash === "#news") {
    // 뉴스 목록 렌더링
    newsContainer.innerHTML = newsListTemplate;
  } else if (hash.startsWith("#news/")) {
    // 뉴스 상세 렌더링
    newsContainer.innerHTML = `
      <div class="news-detail-view" style="padding: 100px 20px;">
        <h2>${hash} 상세 페이지입니다.</h2>
        <a href="#news" style="color:red;">← 목록으로 돌아가기</a>
      </div>
    `;
  }
}
