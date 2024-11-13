gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-transitions');

  initMenu();
  initShowMoreProjects();
  initAnimations();
  initMobileAnimations();
  initSliders();
  initForms();

  // Menu
  function initMenu() {
    const header = document.querySelector('.header');

    if (!header) return;

    const headerHeight = header.offsetHeight;

    const menu = new Menu({
      menu: document.querySelector('.header__menu'),
      burger: document.querySelector('.header__burger'),
      overlay: document.querySelector('.overlay'),
      navLinks: document.querySelectorAll('.header__nav a'),
      burgerCaption: 'Открыть меню',
      burgerActiveCaption: 'Закрыть меню',
      transitionDelay: 400,
      breakpoint: 1200,
      onOpen: () =>
        document.querySelector('.header').classList.add('is-active'),
      onClose: () =>
        document.querySelector('.header').classList.remove('is-active'),
    });

    window.addEventListener('scroll', (e) => {
      window.pageYOffset > headerHeight
        ? header.classList.add('is-fixed')
        : header.classList.remove('is-fixed');
    });
  }

  // Show More Projects
  function initShowMoreProjects() {
    const projectsBtn = document.querySelector('.projects__btn-wrapper');

    if (!projectsBtn) return;

    const projectsList = document.querySelector('.projects__list');

    projectsBtn.addEventListener('click', () => {
      projectsList.classList.add('is-expanded');
      projectsBtn.style.display = 'none';
    });
  }

  // Animations
  function initAnimations() {
    // PC && MOBILE Animations
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
    // End PC && MOBILE Animations

    if (window.innerWidth <= 991 || ScrollTrigger.isTouch === 1) return;

    document.body.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--clientX', `${e.clientX}px`);
      document.documentElement.style.setProperty('--clientY', `${e.clientY}px`);
    });

    gsap.config({nullTargetWarn: false});

    // Titles animations
    const titles = document.querySelectorAll(
      '.section .title:not([data-animate="false"])'
    );

    for (let i = 0; i < titles.length; i++) {
      gsap.from(titles[i], {
        opacity: 0,
        x: -160,
        scrollTrigger: {
          trigger: titles[i],
          start: 'top bottom',
          scrub: 1,
          end: '+=80%',
          once: true
        },
      });
    }

    const titlesBack = document.querySelectorAll(
      '.section__title-back:not([data-animate="false"])'
    );

    for (let i = 0; i < titlesBack.length; i++) {
      gsap.from(titlesBack[i], {
        opacity: 0,
        x: 160,
        scrollTrigger: {
          trigger: titlesBack[i],
          start: 'top bottom',
          scrub: 1,
          end: '+=80%',
          once: true
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
        once: true
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
          once: true
        },
      });
    }
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
          once: true
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
        once: true
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
        once: true
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
          once: true
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
          once: true
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
          once: true
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
        once: true
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
        once: true
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
          once: true
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
        once: true
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
        once: true
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
        once: true
      },
    });
    // End Contacts animations

    // Services animations
    const servicesItems = document.querySelectorAll('.services__item');

    for (let i = 0; i < servicesItems.length; i++) {
      const box = servicesItems[i].querySelector('.services__box');
      const info = servicesItems[i].querySelector('.services__info');

      gsap.from(box, {
        opacity: 0,
        x: (i + 1) % 2 === 0 ? 160 : -160,
        scrollTrigger: {
          trigger: box,
          start: 'top bottom',
          scrub: 1,
          end: '+=80%',
          once: true
        },
      });

      gsap.from(info, {
        opacity: 0,
        x: (i + 1) % 2 === 0 ? -160 : 160,
        scrollTrigger: {
          trigger: info,
          start: 'top bottom',
          scrub: 1,
          end: '+=80%',
          once: true
        },
      });
    }

    // End Services animations
  }

  function initMobileAnimations() {
    if (window.innerWidth > 991) return;

    const servicesBoxes = document.querySelectorAll('.services__box');

    servicesBoxes.forEach(box => {
      gsap.from(box, {
        scrollTrigger: {
          trigger: box,
          start: 'top 50%',
          once: true,
          onEnter: () => {
            box.classList.add('is-animated');
          }
        },
      });
    })

    const projectsItems = document.querySelectorAll('.projects__item');

    projectsItems.forEach(item => {
      item.addEventListener('click', () => {
        projectsItems.forEach(el => el.classList.remove('is-active'));
        item.classList.add('is-active');
      })
    });

  }

  // Sliders
  function initSliders() {
    const reviewsSlider = document.querySelector('.reviews__slider');

    if (!reviewsSlider) return;

    const splide = new Splide(reviewsSlider, {
      perPage: 3,
      perMove: 1,
      start: 1,
      gap: 44,
      speed: 1000,
      autoHeight: true,
      keyboard: 'focused',
      updateOnMove: true,
      type: 'loop',
      focus: 'center',
      breakpoints: {
        700: {
          gap: 24,
        },
        1580: {
          perPage: 'auto',
          autoWidth: true,
        },
      },
    });

    splide.mount();
  }

  // Forms & Modals
  function initForms() {
    // Modals
    const options = {
      transitionDelay: 350,
      fixedBlocks: [document.querySelector('.header')],
      onOpen: () => {
        document.querySelector('.page-wrapper').ariaHidden = true;
      },
      onClose: () => {
        document.querySelector('.page-wrapper').ariaHidden = false;
      },
    };

    const modals = new SimpleModal(options);
    const inputs = document.querySelectorAll('input, textarea');

    modals.init();
    // End Modals

    const forms = document.querySelectorAll('.form');
    const servicesButtons = document.querySelectorAll('.services__btn');

    servicesButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = btn.closest('.services__item');
        const modal = document.querySelector('#modal-form');

        if (!parent || !modal) return;

        const title = parent.querySelector('.services__subtitle');
        const input = modal.querySelector('input[name="request-from"]');

        if (!title || !input) return;

        input.value = title.textContent;
      })
    });

    forms.forEach((form) => {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

				if (formData.get('mike').trim() !== '') {
          return;
        }

        fetch('telegram.php', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              return response.json();
            } else {
              return response.text();
            }
          })
          .then(data => {
            console.log("Success:", data);
            modals.open('modal-success');
            form.reset();
          })
          .catch(error => {
            console.error("Error:", error);
            modals.open('modal-error');
          });
      });
    });

    inputs.forEach((input) => {
      input.addEventListener('input', function() {
          this.value = this.value.replace(/[<>]/g, '');
      });
  });
  
  }
});
