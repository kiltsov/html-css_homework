//
gsap.registerPlugin(ScrollTrigger);

// IS MOBILE CONDITION
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Navbar Scroll Up and Down
function navbarScroll() {
  //
  let lastScrollY = window.scrollY;
  let hideThreshold = window.innerHeight * 0.05;
  let isNavbarHidden = false;

  gsap.to(".header", {
    scrollTrigger: {
      onUpdate: (self) => {
        let direction = self.direction;
        let currentScrollY = window.scrollY;

        if (currentScrollY > hideThreshold) {
          if (direction === 1 && !isNavbarHidden) {
            //
            gsap.to(".header", {
              yPercent: -100,
              duration: 0.6,
              ease: "power2.out",
            });
            isNavbarHidden = true;
          } else if (direction === -1 && isNavbarHidden) {
            //
            gsap.to(".header", {
              yPercent: 0,
              duration: 0.6,
              ease: "power2.out",
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
  const swiperFeedback = new Swiper(".feedback-swiper", {
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,

    grabCursor: true,
    a11y: false,
    allowTouchMove: true,

    loop: true,

    navigation: {
      prevEl: "[swiper-right-button=feedback]",
      nextEl: "[swiper-left-button=feedback]",
    },

    pagination: {
      el: ".swiper-pagination",
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
