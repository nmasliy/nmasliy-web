gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-transitions');

  initShowMoreProjects();
  initAnimations();
  initSliders();

  function initShowMoreProjects() {
    const projectsBtn = document.querySelector('.projects__btn-wrapper');

    if (!projectsBtn) return;

    const projectsList = document.querySelector('.projects__list');

    projectsBtn.addEventListener('click', () => {
      projectsList.classList.add('is-expanded');
      projectsBtn.style.display = 'none';
    });
  }

  function initAnimations() {
    // gsap.from('.benefits', {
    //   opacity: 0,
    //   y: 200,
    //   scrollTrigger: {
    //     trigger: '.benefits',
    //     start: 'top bottom',
    //     markers: true,
    //   },
    // });
  }

  function initSliders() {
    const swiper = new Swiper('.swiper', {
      loop: true,
      speed: 500,
      centeredSlides: true,
      initialSlide: 1,
      slidesPerView: 3,
      spaceBetween: 44,
      navigation: {
        nextEl: '.reviews__btn--next',
        prevEl: '.reviews__btn--prev',
      },
    });
  }
});
