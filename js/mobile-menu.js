document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle-btn");
  const mobileSidebar = document.querySelector(".mobile-sidebar");
  const overlay = document.querySelector(".menu-overlay");

  function toggleMenu() {
    toggleBtn.classList.toggle("open");
    mobileSidebar.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  toggleBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // 사이드바 내부 링크를 클릭하면 메뉴 닫기
  const menuLinks = mobileSidebar.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileSidebar.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // 데스크탑 화면으로 복귀 시 메뉴 오픈 클래스 제거
      if (window.innerWidth > 768) {
        document.body.classList.remove("menu-open");

        const currentSidebar = document.querySelector(".mobile-sidebar");
        const currentToggleBtn = document.querySelector(".menu-toggle-btn");
        const currentOverlay = document.querySelector(".menu-overlay");

        if (currentSidebar) currentSidebar.classList.remove("open");
        if (currentToggleBtn) currentToggleBtn.classList.remove("open");
        if (currentOverlay) currentOverlay.classList.remove("active");
      }
    }, 100);
  });
});
