const wrapper = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".slide-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// 기본 active는 항상 1번째 슬라이드
let currentIndex = 1;
let isTransitioning = false; // 연속 클릭 방지

// .active 슬라이드가 언제나 브라우저 정중앙에 오도록 계산
function updateSliderPosition(hasAnimation = true) {
  if (hasAnimation) {
    wrapper.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    slides.forEach((slide) => {
      slide.style.transition = "";
    });
  } else {
    wrapper.style.transition = "none";
    slides.forEach((slide) => {
      slide.style.transition = "none";
    });
  }

  // 현재 보이는 슬라이드에 active 부여
  slides.forEach((slide, idx) => {
    if (idx === currentIndex) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  const targetSlide = slides[currentIndex];
  if (!targetSlide) return;

  const slideWidth = targetSlide.offsetWidth;
  const slideLeft = targetSlide.offsetLeft;

  // 브라우저 정중앙 좌표 계산
  const centerOffset = (window.innerWidth - slideWidth) / 2;
  const moveX = -slideLeft + centerOffset;

  wrapper.style.transform = `translateX(${moveX}px)`;

  // 브라우저 렌더링 강제 리플로우
  if (!hasAnimation) {
    wrapper.offsetHeight;
  }
}

// 끝에서 순간 이동 처리
function checkLoop() {
  // 맨 앞 클론(idx=0)에 도달하면 마지막 이미지로 순간이동
  if (currentIndex === 0) {
    currentIndex = slides.length - 3;
    updateSliderPosition(false);
  }

  // 맨 뒤 클론(idx=4)에 도달하면 첫 번째 이미지로 순간이동
  if (currentIndex === slides.length - 2) {
    currentIndex = 1;
    updateSliderPosition(false);
  }

  isTransitioning = false;
}

// [Event]
nextBtn.addEventListener("click", () => {
  // 슬라이딩 중일 때는 클릭 무시
  if (isTransitioning) return;

  isTransitioning = true;
  currentIndex++;
  updateSliderPosition();
});

prevBtn.addEventListener("click", () => {
  // 슬라이딩 중일 때는 클릭 무시
  if (isTransitioning) return;

  isTransitioning = true;
  currentIndex--;
  updateSliderPosition();
});

// 트랜지션 애니메이션이 끝날 때 루프 검사
wrapper.addEventListener("transitionend", checkLoop);

// 브라우저 화면 크기가 바뀌어도 정중앙 유지
window.addEventListener("resize", () => {
  updateSliderPosition(false);
});

// 초기 정렬 위치 세팅
updateSliderPosition(false);

// 밴드 슬라이더 자동 재생
let slideInterval;

function startAutoSlide() {
  // nextBtn 클릭과 동일하게
  slideInterval = setInterval(() => {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex++;
    updateSliderPosition();
  }, 5000);
}

startAutoSlide();

const sliderContainer = document.querySelector("#band-slider"); // 슬라이더 전체 영역 ID

sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

sliderContainer.addEventListener("mouseleave", () => {
  startAutoSlide();
});
