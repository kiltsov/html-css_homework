//
gsap.registerPlugin(ScrollTrigger);

// IS MOBILE CONDITION
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Слайдер Эконом
function grabSlider() {
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.econom__slider');
    const beforeSlide = slider.querySelector('.is-before');
    const toggle = slider.querySelector('.econom__slider-toogle');

    let isDragging = false;
    let lastOffsetPercent = 0;
    let animationFrameId = null;

    const updateSlider = (x) => {
      const rect = slider.getBoundingClientRect();
      let offset = x - rect.left;
      offset = Math.max(0, Math.min(offset, rect.width));
      const offsetPercent = (offset / rect.width) * 100;

      // Обновляем положение toggle и clip-path
      toggle.style.left = `${offsetPercent}%`;
      beforeSlide.style.clipPath = `inset(0 ${100 - offsetPercent}% 0 0)`;
      lastOffsetPercent = offsetPercent;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      // Синхронизируем с requestAnimationFrame
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          updateSlider(e.clientX);
          animationFrameId = null;
        });
      }
    };

    // Начало перетаскивания
    toggle.addEventListener('mousedown', (e) => {
      isDragging = true;
      toggle.style.cursor = 'grabbing';

      // Мгновенно синхронизируем на первом кадре
      updateSlider(e.clientX);
    });

    // Перетаскивание
    window.addEventListener('mousemove', onMouseMove);

    // Завершение перетаскивания
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;

      isDragging = false;
      toggle.style.cursor = 'grab';

      // Сбрасываем анимацию, если она активна
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  });
}

// Navbar Scroll Up and Down
function navbarScroll() {
  //
  let lastScrollY = window.scrollY;
  let hideThreshold = window.innerHeight * 0.05;
  let isNavbarHidden = false;

  gsap.to('.header', {
    scrollTrigger: {
      onUpdate: (self) => {
        let direction = self.direction;
        let currentScrollY = window.scrollY;

        if (currentScrollY > hideThreshold) {
          if (direction === 1 && !isNavbarHidden) {
            //
            gsap.to('.header', {
              yPercent: -100,
              duration: 0.6,
              ease: 'power2.out',
            });
            isNavbarHidden = true;
          } else if (direction === -1 && isNavbarHidden) {
            //
            gsap.to('.header', {
              yPercent: 0,
              duration: 0.6,
              ease: 'power2.out',
            });
            isNavbarHidden = false;
          }
        }
      },
    },
  });
  //
}

// Swiper Feedbacks
function swiperFeedback() {
  //
  const swiperFeedback = new Swiper('.feedback-swiper', {
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,

    grabCursor: true,
    a11y: false,
    allowTouchMove: true,

    loop: true,

    navigation: {
      prevEl: '[swiper-right-button=feedback]',
      nextEl: '[swiper-left-button=feedback]',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      992: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      480: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  });
}

// Запускается на десктопах
if (!isMobile() && window.innerWidth > 992) {
  //
  navbarScroll();
  //
}

swiperFeedback();
grabSlider();
