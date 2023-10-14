gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-transitions');

  window.addEventListener('scroll', e => {
    document.querySelector(':root').style.setProperty('--scrollTop', `${window.scrollY}px`);
  })

  initShowMoreProjects();
  initAnimations();
  initSliders();
  initModals();

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
    gsap.config({nullTargetWarn:false});
    
    // Titles animations
    const titles = document.querySelectorAll('.section .title:not([data-animate="false"])');

    for (let i = 0; i < titles.length; i++) {
      gsap.from(titles[i], {
        opacity: 0,
        x: -160,
        scrollTrigger: {
          trigger: titles[i],
          start: 'top bottom',
          scrub: 1,
          end: '+=80%',
        },
      });
    }

    const titlesBack = document.querySelectorAll('.section__title-back:not([data-animate="false"])');

    for (let i = 0; i < titlesBack.length; i++) {
      gsap.from(titlesBack[i], {
        opacity: 0,
        x: 160,
        scrollTrigger: {
          trigger: titlesBack[i],
          start: 'top bottom',
          scrub: 1,
          end: '+=80%',
        },
      });
    }
    // End Titles animations

    // Benefits animations
    const benefitsItems = document.querySelectorAll('.benefits__item');

    gsap.from('.benefits__list', {
      opacity: 0,
      x: 60,
      scrollTrigger: {
        trigger: '.benefits__list',
        start: 'top bottom',
        scrub: 1,
        end: '+=40%',
      },
    });

    for (let i = 0; i < benefitsItems.length; i++) {
      gsap.from(benefitsItems[i], {
        opacity: 0,
        x: 100,
        delay: i / 5,
        scrollTrigger: {
          trigger: benefitsItems[i],
          start: 'top bottom',
        },
      });
    }

    const benefitsNums = document.querySelectorAll('.benefits__num-value');

    benefitsNums.forEach((num, i) => {
      const endValue = +num.textContent;
      const startValue = 0;
      const trigger = num.closest('.benefits__item');

      num.textContent = startValue;

      const counter = {
        value: startValue,
      };

      gsap.to(counter, {
        value: endValue,
        duration: 1 + i / 2,
        onUpdate: () => {
          num.textContent = Math.round(counter.value);
        },
        scrollTrigger: {
          trigger: trigger,
          start: '150px bottom',
        },
      });
    });
    // End Benefits animations

    // About animations
    const aboutItems = document.querySelectorAll('.about__box');

    for (let i = 0; i < aboutItems.length; i++) {
      gsap.from(aboutItems[i], {
        opacity: 0,
        y: 60,
        delay: i / 5,
        scrollTrigger: {
          trigger: aboutItems[i],
          start: 'top bottom',
        },
      });
    }

    gsap.from('.about__image', {
      opacity: 0,
      x: 160,
      scrollTrigger: {
        trigger: '.about__image',
        start: 'top bottom',
        scrub: 1,
        end: '+=80%',
      },
    });

    gsap.from('.about__info', {
      opacity: 0,
      y: 90,
      scrollTrigger: {
        trigger: '.about__info',
        start: 'top bottom',
        scrub: 1,
        end: '+=90%',
      },
    });
    // End About animations

    // Skills animations
    const skillsItems = document.querySelectorAll('.skills__item');

    for (let i = 0; i < skillsItems.length; i++) {
      gsap.from(skillsItems[i], {
        opacity: 0,
        x: 100,
        delay: i / 5,
        scrollTrigger: {
          trigger: skillsItems[i],
          start: 'top bottom',
        },
      });
    }

    const skillsTagsItems = document.querySelectorAll('.skills__tags-item');

    for (let i = 0; i < skillsTagsItems.length; i++) {
      gsap.from(skillsTagsItems[i], {
        opacity: 0,
        x: 20,
        duration: (skillsTagsItems.length - i + 1) / 40,
        delay: i / 7,
        scrollTrigger: {
          trigger: skillsTagsItems[i],
          start: 'top bottom',
        },
      });
    }

    const skillsSubtitles = document.querySelectorAll(
      '.skills .section__subtitle'
    );

    for (let i = 0; i < skillsSubtitles.length; i++) {
      gsap.from(skillsSubtitles[i], {
        opacity: 0,
        y: 20,
        delay: i / 5,
        scrollTrigger: {
          trigger: skillsSubtitles[i],
          start: 'top bottom',
        },
      });
    }

    gsap.from('.skills__image', {
      opacity: 0,
      x: 160,
      scrollTrigger: {
        trigger: '.skills__image',
        start: 'top bottom',
        scrub: 1,
        end: '+=80%',
      },
    });

    gsap.from('.skills__content', {
      opacity: 0,
      x: -160,
      scrollTrigger: {
        trigger: '.skills__content',
        start: 'top bottom',
        scrub: 1,
        end: '+=80%',
      },
    });
    // End Skills animations

    // Projects animations
    const projectsItems = document.querySelectorAll('.projects__item');

    for (let i = 0; i < projectsItems.length; i++) {
      gsap.from(projectsItems[i], {
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: projectsItems[i],
          start: 'top bottom',
          scrub: 1,
          end: '+=100%',
        },
      });
    }
    // End Projects animations

    // Reviews animations
    gsap.from('.reviews__slider', {
      opacity: 0,
      x: 260,
      scrollTrigger: {
        trigger: '.reviews__slider',
        start: 'top bottom',
        scrub: 1,
        end: '+=80%',
      },
    });
    // End Reviews animations

    // Contacts animations
    gsap.from('.contacts__image', {
      opacity: 0,
      x: 160,
      scrollTrigger: {
        trigger: '.contacts__image',
        start: 'top bottom',
        scrub: 1,
        end: '+=80%',
      },
    });

    gsap.from('.contacts__form', {
      opacity: 0,
      x: -160,
      scrollTrigger: {
        trigger: '.contacts__form',
        start: 'top bottom',
        scrub: 1,
        end: '+=70%',
      },
    });
    // End Contacts animations
  }

  function initSliders() {
    const reviewsSlider = document.querySelector('.reviews__slider');
    
    if (!reviewsSlider) return;
    
    const reviewsSwiper = new Swiper(reviewsSlider, {
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

  function initModals() {
    const options = {
      transitionDelay: 350
    };
    
    const modals = new SimpleModal(options);
    
    modals.init();
  }
});
