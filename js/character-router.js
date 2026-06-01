function initCharacter() {
  const characterContainer = document.querySelector(".character-container");

  if (!characterContainer) return;

  const characterTemplate = `
    <div class="character-view">
  
      <div class="section-title">CHARACTER</div>

      <div class="band-tab-menu">
        <img src="images/band/togenashitogeari/background.png" class="menu-bg-img">

        <a href="#band/togenashitogeari" class="band-tab">
          <img src="images/band/togenashitogeari/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/togenashitogeari/tab_logo_hover.webp" class="tab-logo-hover">
        </a>

        <a href="#band/cannalily" class="band-tab">
          <img src="images/band/cannalily/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/cannalily/tab_logo_hover.webp" class="tab-logo-hover">
        </a>

        <a href="#band/f-272" class="band-tab">
          <img src="images/band/f-272/tab_logo_default.webp" class="tab-logo-default">
          <img src="images/band/f-272/tab_logo_hover.webp" class="tab-logo-hover">
        </a>
      </div>

      <div class="character-detail-content">

        <div class="character-visual-box">
          <img src="images/character/togenashitogeari/subaru_full.webp" class="character-main-img">
        </div>

        <div class="character-info-box">
        
          <div class="character-name-box">
            <div class="character-part">Dr.</div>
            <div class="character-name-kr">아와 스바루 <span class="character-name-jp">(安和 すばる)</span></div>
          </div>

          <div class="character-desc-box">
            <div class="character-quote">“거짓말하는 것도 쉬운 게 아니거든.”</div>
            <p>연예인 학교에 다니는 여자아이.</p>
            <p>유망주로 주목받으며 광고에도 출연하고 있다.</p>
            <p>붙임성 좋고 사회성도 뛰어난 미소녀.</p>
            <p>모델이라고 해도 손색없을 미모를 가졌지만,</p>
            <p>실제 성격은 자존심이 강하고 지기 싫어하는 아가씨 타입이다.</p>
          </div>

          <div class="character-profile-box">
            <div class="profile-header">PROFILE</div>
            <div class="profile-table">
              <div class="profile-row">
                <div class="profile-label">나이</div>
                <div class="profile-value">17세</div>
              </div>
              <div class="profile-row">
                <div class="profile-label">생일</div>
                <div class="profile-value">4월 27일</div>
              </div>
              <div class="profile-row">
                <div class="profile-label">좋아하는 음식</div>
                <div class="profile-value">고수 | 피망 | 레몬 | 새콤한 것들</div>
              </div>
              <div class="profile-row">
                <div class="profile-label">취미 / 어필 포인트</div>
                <div class="profile-value">인도어파 | 게임 | 인터넷 | 키보드 배틀</div>
              </div>
            </div>
            <div class="profile-footer">CV. 미레이</div>
          </div>
        </div>
      </div>

      <div class="section-title">MEMBER</div>

      <div class="character-members-wrapper">

        <div class="character-members-content">

        <a href="#character/subaru" class="character-member-card active">
            <img src="images/character/togenashitogeari/subaru_thumb.jpg" class="character-member-img">
            <div class="character-member-info">
              <div class="character-member-part">Dr.</div>
              <div class="character-member-name">아와 스바루</div>
            </div>
          </a>

          <a href="#character/momoka" class="character-member-card">
            <img src="images/character/togenashitogeari/momoka_thumb.jpg" class="character-member-img">
            <div class="character-member-info">
              <div class="character-member-part">Gt.</div>
              <div class="character-member-name">카와라기 모모카</div>
            </div>
          </a>

          <a href="#character/nina" class="character-member-card">
            <img src="images/character/togenashitogeari/nina_thumb.jpg" class="character-member-img">
            <div class="character-member-info">
              <div class="character-member-part">Vo.</div>
              <div class="character-member-name">이세리 니나</div>
            </div>
          </a>

          <a href="#character/tomo" class="character-member-card">
            <img src="images/character/togenashitogeari/tomo_thumb.jpg" class="character-member-img">
            <div class="character-member-info">
              <div class="character-member-part">Key.</div>
              <div class="character-member-name">에비즈카 토모</div>
            </div>
          </a>

          <a href="#character/rupa" class="character-member-card">
            <img src="images/character/togenashitogeari/rupa_thumb.jpg" class="character-member-img">
            <div class="character-member-info">
              <div class="character-member-part">Ba.</div>
              <div class="character-member-name">루파</div>
            </div>
          </a>
        </div>
      </div>

      <div class="section-title">OFFICIAL MEDIA</div>
      <div class="character-media-content">
        <a href="https://www.youtube.com/watch?v=1VTyLjtuQ98" class="character-media-link">
          <img src="images/character/togenashitogeari/subaru_pv_thumb.jpg" class="character-media-img youtube">
          <span class="character-media-text">캐릭터 PV</span>
        </a>
        <a href="https://www.youtube.com/watch?v=6IiAfahrn2A" class="character-media-link">
          <img src="images/character/togenashitogeari/subaru_intro_thumb.jpg" class="character-media-img youtube">
          <span class="character-media-text">자기소개</span>
        </a>
        <a href="https://x.com/girlsbandcry/status/1664119579356938240?s=20" class="character-media-link">
          <img src="images/character/togenashitogeari/gbc_sns_thumb.jpg" class="character-media-img sns">
          <span class="character-media-text">캐릭터 소개</span>
        </a>
        <a href="https://x.com/mirei_togetoge/status/1684035814819504128?s=20" class="character-media-link">
          <img src="images/character/togenashitogeari/mirei_thumb.jpg" class="character-media-img sns">
          <span class="character-media-text">성우 코멘트</span>
        </a>
      </div>

</div>
  `;

  characterContainer.innerHTML = characterTemplate;
}
