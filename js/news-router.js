// 메인 페이지 최신 뉴스 데이터
async function initLatestNews() {
  const container = document.querySelector(".news-list");

  if (!container) return;

  const newsData = await fetchNewsData();

  // 날짜 & id 기준 최신순 정렬
  const sortedNews = newsData.sort(
    (a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id),
  );

  // 상위 3개만 자르기
  const latestNews = sortedNews.slice(0, 3);

  const latestNewsHTML = latestNews
    .map(
      (news) => `
        <div class="news-item">
          <a href="#news/${news.id}" class="news-link">
              <div class="news-date">${news.date}</div>
              <div class="news-title">${news.title}</div>
          </a>
        </div>
      `,
    )
    .join("");

  console.log(latestNewsHTML);

  container.innerHTML = latestNewsHTML;
}

// 뉴스 목록 / 뉴스 상세 서브 라우터
async function initNews() {
  const container = document.querySelector(".page-container");

  if (!container) return;

  const hash = window.location.hash;

  if (!hash || hash === "#news") {
    // 뉴스 목록 렌더링
    await renderNewsList(container);
  } else if (hash.startsWith("#news/")) {
    // 뉴스 상세 렌더링
    const newsId = hash.split("/")[1];
    await renderNewsDetail(container, newsId);
  }
}

// 뉴스 목록 렌더링
async function renderNewsList(container) {
  const newsData = await fetchNewsData();

  // 날짜 & id 기준 최신순 정렬
  const sortedNews = newsData.sort(
    (a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id),
  );

  const itemsPerPage = 5; // 한 페이지에 보여줄 뉴스 개수
  const pagesPerBlock = 5; // 한 페이지에 보여줄 버튼 개수

  // 목록 페이지 그리기
  function renderPage(currentPage) {
    const totalItems = sortedNews.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentNews = sortedNews.slice(startIndex, endIndex);

    const listHTML = currentNews
      .map(
        (news) => `
        <div class="news-item">
          <a href="#news/${news.id}" class="news-link">
              <div class="news-date">${news.date}</div>
              <div class="news-title">${news.title}</div>
          </a>
        </div>
      `,
      )
      .join("");

    const currentBlock = Math.ceil(currentPage / pagesPerBlock);
    const startPage = (currentBlock - 1) * pagesPerBlock + 1;
    const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

    let paginationHTML = "";

    // 이전 블록으로 가기
    if (startPage > 1) {
      paginationHTML += `<button class="page-btn prev-page" data-page="${startPage - 1}"><i class="fa-solid fa-angle-left"></i></button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage ? "active" : "";
      paginationHTML += `<button class="page-btn ${isActive}" data-page="${i}">${i}</button>`;
    }

    // 다음 블록으로 가기
    if (endPage < totalPages) {
      paginationHTML += `<button class="page-btn next-page" data-page="${endPage + 1}"><i class="fa-solid fa-angle-right"></i></button>`;
    }

    container.innerHTML = `
    <div class="page-view">
      <div class="section-title">NEWS</div>
      <div class="news-list">
        ${listHTML}
      </div>
      <div class="pagination">
        ${paginationHTML}
      </div>
    </div>
  `;

    const pageBtns = container.querySelectorAll(".page-btn");
    pageBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetPage = parseInt(e.currentTarget.getAttribute("data-page"));
        renderPage(targetPage); // 클릭한 페이지로 다시 그리기
        window.scrollTo(0, 0);
      });
    });
  }

  renderPage(1); // 초기 페이지 렌더링
}

// 뉴스 상세 렌더링
async function renderNewsDetail(container, newsId) {
  const newsData = await fetchNewsData();
  const news = newsData.find((item) => item.id === newsId);

  if (!news) {
    container.innerHTML = "<h2>뉴스를 찾을 수 없습니다.</h2>";
    return;
  }

  // description
  const descriptionHTML = (news.details.description || [])
    .map((text) => `<p>${text}</p>`)
    .join("");

  // info_list
  const infoListHTML = (news.details.info_list || [])
    .map((info) => {
      const valueHTML = info.value ?
        info.value.map((text) => `<p>${text}</p>`).join("")
        : "";

      // 링크가 있으면 <a> 태그 사용
      const linkHTML = info.link && info.link.length > 0
        ? info.link
          .map(
            (linkItem) =>
              `<p><a href="${linkItem.url}" target="_blank" rel="noopener noreferrer" class="detail-link">${linkItem.text}</a></p>`
          )
          .join("")
        : "";

      return `
        <div class="info-item">
          <p class="info-label">${info.label}</p>
          <div class="info-value-box">
            ${valueHTML}
            ${linkHTML}
          </div>
        </div>
      `;
    })
    .join("");

  const imageHTML = news.details.news_image
    ? `<img src="${news.details.news_image}" class="detail-image">`
    : "";

  container.innerHTML = `
    <div class="news-detail-view">

        <div class="section-title">NEWS</div>

        <div class="detail-header">
          <div class="detail-date">${news.date}</div>
          <h2 class="detail-title">${news.title}</h2>
        </div>

        <div class="detail-body">
          <div class="news-detail-wrapper">
            ${imageHTML}
            <div class="news-detail-content">
              ${descriptionHTML}
              <br>
              ${infoListHTML}
            </div>
          </div>
        </div>

        <div class="back-btn-wrapper">
          <a href="#news" class="back-to-list-btn"><i class="fa-solid fa-chevron-left"></i>목록으로 돌아가기</a>
        </div>
    </div>
  `;
}
