(function () {
  function initWelcomeDecorAnim() {
    const items = document.querySelectorAll(".fav-page .welcome__decor .welcome__decor-item");
    items.forEach((el) => el.classList.add("animate-appear"));
    items.forEach((el) => {
      el.addEventListener("animationend", function handler(e) {
        if (e.animationName === "welcome-decor-appear" || e.animationName === "welcomeDecorAppear") {
          el.classList.add("levitating");
          el.removeEventListener("animationend", handler);
        }
      });
    });
  }

  function run() {
    initWelcomeDecorAnim();

    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isMacTouch = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    const isFirefox = /Firefox/i.test(ua);

    if (!isIOS && !isMacTouch && !isFirefox) return;

    const bonusWrapp = document.querySelector(".fav-page .bonusWrapp");
    if (!bonusWrapp) return;

    function initCustomScrollbar() {
      if (!window.matchMedia("(max-width: 1340px)").matches) return;
      if (bonusWrapp.dataset.iosScrollbar) return;

      bonusWrapp.dataset.iosScrollbar = "true";
      bonusWrapp.classList.add("ios-scrollbar-outer");

      const track = document.createElement("div");
      track.className = "ios-scrollbar-track-h";
      const thumb = document.createElement("div");
      thumb.className = "ios-scrollbar-thumb-h";
      track.appendChild(thumb);
      bonusWrapp.appendChild(track);

      function updateThumb() {
        const sw = bonusWrapp.scrollWidth;
        const cw = bonusWrapp.clientWidth;
        if (sw <= cw) {
          track.style.display = "none";
          return;
        }
        track.style.display = "block";
        const scrollLeft = bonusWrapp.scrollLeft;
        const thumbWidth = Math.max((cw / sw) * cw, 24);
        const maxLeft = cw - thumbWidth;
        const left = (scrollLeft / (sw - cw)) * maxLeft;
        thumb.style.width = thumbWidth + "px";
        thumb.style.transform = "translateX(" + left + "px)";
      }

      bonusWrapp.addEventListener("scroll", updateThumb);
      new MutationObserver(updateThumb).observe(bonusWrapp, { childList: true, subtree: true });
      window.addEventListener("resize", updateThumb);
      updateThumb();
      setTimeout(updateThumb, 100);
      setTimeout(updateThumb, 400);
    }

    initCustomScrollbar();
    window.addEventListener("resize", initCustomScrollbar);
  }

  run();
})();
