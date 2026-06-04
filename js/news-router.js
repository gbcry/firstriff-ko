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

  // 뉴스 상세 페이지 화면
  const newsDetailTemplate = `
    <div class="news-detail-view">

      <div class="section-title">NEWS</div>

      <div class="detail-header">
        <div class="detail-date">2026.04.18</div>
        <h2 class="detail-title">F-272 1st ONE-MAN LIVE The Dissonant “I DOLL” 개최 결정!</h2>
      </div>

      <div class="detail-body">
        <img src="images/news/20260418_01.png" class="detail-image">
        <div class="news-detail-content">
          <p>F-272 1st ONE-MAN LIVE The Dissonant “I DOLL”의 개최가 결정되었습니다.</p>
          <br>
          <p>■ 개최 일정</p>
          <p>2026년 7월 20일(月·공휴일) 입장 16:00 / 시작 17:00</p>
          <br>
          <p>■ 장소</p>
          <p>다이칸야마 UNIT (도쿄도 시부야구)</p>
          <br>
          <p>■ 티켓 정보</p>
          <p>선행 추첨 판매를 실시합니다.</p>
          <p>접수 기간: 2026년 4월 18일(土) 21:00 ~ 4월 30일(木) 23:59</p>
          <p>※ 티켓 신청을 위해서는 Musing 회원가입(무료)이 필요합니다.</p>
          <br>
          <p><a href="https://musing.jp/ticket/F272_1st/" target="_blank" rel="noopener noreferrer" class="detail-link">Musing 예매 페이지 바로가기</a></p>
          <br>
          <p>■ F-272 공식 SNS</p>
          <p>라이브 관련 최신 정보는 F-272 공식 X를 통해 확인해 주시기 바랍니다.</p>
          <br>
          <p><a href="https://x.com/F_272_GBC" target="_blank" rel="noopener noreferrer" class="detail-link">F-272 공식 X</a></p>
        </div>
      </div>

      <div class="back-btn-wrapper">
        <a href="#news" class="back-to-list-btn"><i class="fa-solid fa-chevron-left"></i>목록으로 돌아가기</a>
      </div>
  </div>
  `;

  if (!hash || hash === "#news") {
    // 뉴스 목록 렌더링
    newsContainer.innerHTML = newsListTemplate;
  } else if (hash.startsWith("#news/")) {
    // 뉴스 상세 렌더링
    newsContainer.innerHTML = newsDetailTemplate;
  }
}
