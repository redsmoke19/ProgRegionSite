(function () {
  'use strict';
  const breakpointDesktop = window.matchMedia('(min-width: 1440px)');
  let advantagesSlider;
  let featuresSlider;

  const breakpointChecker = function () {
    let resizeTimeout;
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        resizeHandlerDesktop();
      }, 100);
    }

    function resizeHandlerDesktop() {
      if (breakpointDesktop.matches === true) {
        if (advantagesSlider !== undefined) {
          advantagesSlider.destroy(true, true);
        }
        if (featuresSlider !== undefined) {
          featuresSlider.destroy(true, true);
        }
      } else if (breakpointDesktop.matches === false) {
        enableSubMenu();
      }
    }
  };

  const enableSubMenu = function () {
    advantagesSlider = new Swiper('.advantages__slider', {
      direction: 'horizontal',
      spaceBetween: 15,
      slidesPerView: 1,
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      pagination: {
        el: '.advantages__pagination',
        type: 'bullets',
        bulletClass: 'pagination__bullet',
        bulletActiveClass: 'pagination__bullet--active',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        }
      }
    });
    featuresSlider = new Swiper('.features__slider', {
      direction: 'horizontal',
      spaceBetween: 15,
      slidesPerView: 1,
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      pagination: {
        el: '.features__pagination',
        type: 'bullets',
        bulletClass: 'pagination__bullet',
        bulletActiveClass: 'pagination__bullet--active',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        }
      }
    });
  };

  breakpointDesktop.addListener(breakpointChecker);
  breakpointChecker();
})();
