(function () {
  'use strict';
  const getSliders = () => {
    const breakpointDesktop = window.matchMedia('(min-width: 1440px)');
    let advantagesSlider;
    let featuresSlider;
    let reviewSlider;

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
          if (reviewSlider !== undefined) {
            reviewSlider.destroy(true, true);
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
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },
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
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },
      });
      reviewSlider = new Swiper('.review__slider', {
        direction: 'horizontal',
        spaceBetween: 15,
        slidesPerView: 1,
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        pagination: {
          el: '.review__pagination',
          type: 'bullets',
          bulletClass: 'pagination__bullet',
          bulletActiveClass: 'pagination__bullet--active',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },
      });
    };

    breakpointDesktop.addListener(breakpointChecker);
    breakpointChecker();
  };
  const getFormValidate = () => {
    const form = document.querySelector('.form');
    const formElems = document.querySelectorAll('.form__input');
    const formButton = document.querySelector('.form__button');

    const patternMail =
      /^[A-Za-z0-9](([_.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
    const errorMessage = [
      'Незаполненное поле ввода',
      'Введите Ваше реальное имя',
      'Укажите Вашу почту',
      'Неверный формат почты',
      'Укажите тему сообщения',
      'Напишите текст сообщения',
      'Уберите специальные символы',
    ];
    let isError = false;

    const getFormData = form => {
      let controls = {};
      if (!form.elements) return '';
      for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (
          element.tagName.toLowerCase() !== 'button'
        ) {
          controls[element.name] = element.value;
        }
      }
      return controls;
    };

    const getError = (formValidate, property) => {
      let error = '';
      let validate = {
        userMail: function () {
          if (formValidate.userMail.length === 0) {
            error = errorMessage[2];
          } else if (patternMail.test(formValidate.userMail) === false) {
            error = errorMessage[3];
          }
        }
      };
      validate[property]();
      return error;
    };

    const showError = (property, error) => {
      let formElement = form.querySelector('[name=' + property + ']');
      let errorBox = form.querySelector('.footer__error');
      formElement.classList.add('footer__input--error');
      errorBox.innerHTML = error;
      errorBox.style.display = 'block';
    };

    const clearError = focusElement => {
      let errorBox = focusElement.previousElementSibling;
      focusElement.classList.remove('footer__input--error');
      errorBox.style.display = 'none';
    };

    formElems.forEach(item => {
      item.addEventListener('blur', e => {
        let formElement = e.target;
        let property = formElement.getAttribute('name');
        let dataField = {};
        dataField[property] = formElement.value;
        let error = getError(dataField, property);
        if (error.length !== 0) {
          showError(property, error);
        }
        return false;
      });
    });

    const validForm = e => {
      e.preventDefault();
      let formValidate = getFormData(form);
      let error;
      for (let property in formValidate) {
        error = getError(formValidate, property);
        if (error.length !== 0) {
          isError = true;
          showError(property, error);
        }
      }

      if (!isError) {
        sendFormData(formValidate);
      }
      return false;
    };

    form.addEventListener(
      'focus',
      () => {
        let focusElement = document.activeElement;
        if (focusElement !== formButton) {
          clearError(focusElement);
        }
      },
      true
    );
    formButton.addEventListener('click', validForm);
  };
  getSliders();
  getFormValidate();
})();
