// 뉴스 데이터
async function fetchNewsData() {
  try {
    const response = await fetch("./data/news.json");
    // { "news": [...] }
    const data = await response.json();

    return Array.isArray(data) ? data : data.news || [];
  } catch (error) {
    console.error("뉴스 데이터를 불러오는데 실패했습니다:", error);
    return [];
  }
}

// 밴드 데이터
async function fetchBandsData() {
  try {
    const response = await fetch("./data/bands.json");
    const data = await response.json();

    return Array.isArray(data) ? data : data.bands || [];
  } catch (error) {
    console.error("밴드 데이터를 불러오는데 실패했습니다:", error);
    return [];
  }
}
