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

// 캐릭터 데이터
async function fetchCharactersData() {
  try {
    const response = await fetch("./data/characters.json");
    const data = await response.json();

    return Array.isArray(data) ? data : data.characters || [];
  } catch (error) {
    console.error("캐릭터 데이터를 불러오는데 실패했습니다:", error);
    return [];
  }
}

// 유튜브 썸네일 자동 추출
function getYouTubeThumbnail(url) {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);

  if (match && match[1]) {
    const videoId = match[1];
    // 썸네일 이미지 주소 반환
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return null;
}
