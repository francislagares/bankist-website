/* eslint-disable no-plusplus */
/// ////////////////////////////////////
// Modal window
/// ////////////////////////////////////

// removing preload class to make transitions work
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = (e: Event) => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/// ////////////////////////////////////
// Button Scrolling
/// ////////////////////////////////////
const btnScrollTo = document.querySelector('.btn--scroll-to');
const features = document.querySelector('#features');

btnScrollTo.addEventListener('click', () => {
  features.scrollIntoView({ behavior: 'smooth' });
});

/// ////////////////////////////////////
// Page Navigation
/// ////////////////////////////////////
document.querySelector('.nav__links').addEventListener('click', (e: Event) => {
  e.preventDefault();

  // You need to explicitly tell TypeScript
  // the type of the HTMLElement which is your target.
  const target = e.target as HTMLLinkElement;

  if (target.classList.contains('nav__link')) {
    const id = target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/// ////////////////////////////////////
// Tabbed Content
/// ////////////////////////////////////
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLButtonElement;

  const clicked: HTMLDivElement = target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active'),
  );

  // Activate tabs
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/// ////////////////////////////////////
// Menu Fade Animation
/// ////////////////////////////////////
const nav: HTMLDivElement = document.querySelector('.nav');

const handleHover = function (e: Event) {
  const target = e.target as HTMLLinkElement;

  if (target.classList.contains('nav__link')) {
    const link = target;
    // eslint-disable-next-line no-undef
    const siblings: NodeListOf<HTMLLinkElement> = link
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      // eslint-disable-next-line no-param-reassign
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind('0.5'));

nav.addEventListener('mouseout', handleHover.bind('1'));

/// ////////////////////////////////////////////////
// Sticky Navigation - Intersection Observer API
/// ///////////////////////////////////////////////
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null as Element,
  threshold: 0,
  // Navigation appears 90px before the threshold was reached
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/// //////////////////////////////////////
// Reveal Sections on scroll
/// //////////////////////////////////////
const allSections = document.querySelectorAll('.section');

const sectionReveal = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null as Element,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/// //////////////////////////////////////
// Lazy Loading Images
/// //////////////////////////////////////
const allImages = document.querySelectorAll('img[data-src]');

const loadImages = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => {
  const [entry] = entries;

  // You need to explicitly tell TypeScript
  // the type of the HTMLElement which is your target.
  // Alternatively you can do it inline like so:
  // (entry.target as HTMLImageElement).src
  // But to avoid this repetition every time
  // is best to store it in a variable
  const target = entry.target as HTMLImageElement;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  target.src = target.dataset.src;
  target.addEventListener('load', () => {
    target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imagesObserver = new IntersectionObserver(loadImages, {
  root: null as Element,
  threshold: 0.5,
});

allImages.forEach(image => {
  imagesObserver.observe(image);
});

/// //////////////////////////////////////
// Slider
/// //////////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  let isDragging = false;
  let currentPosition: number;
  let newPosition: number;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}">
          <span class="scr-reader">Dots to scroll testimonials</span>
        </button>`,
      );
    });
  };

  const activateDot = function (slide: number) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide: number) {
    slides.forEach(
      // eslint-disable-next-line no-return-assign
      (s: HTMLDivElement, i: number) =>
        // eslint-disable-next-line no-param-reassign
        (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const getPositionX = (event: TouchEvent) =>
    // @ts-ignore
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

  // eslint-disable-next-line no-unused-vars
  const touchStart = function (i: number) {
    // eslint-disable-next-line func-names
    return function (event: TouchEvent) {
      isDragging = true;

      currentPosition = getPositionX(event);
    };
  };

  const touchMove = function (event: TouchEvent) {
    if (isDragging) {
      newPosition = getPositionX(event);
    }
  };

  const touchEnd = function () {
    isDragging = false;

    // eslint-disable-next-line no-unused-expressions
    currentPosition > newPosition ? nextSlide() : prevSlide();
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    // eslint-disable-next-line no-unused-expressions
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains('dots__dot')) {
      const { slide } = target.dataset;
      goToSlide(+slide);
      activateDot(+slide);
    }
  });

  document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.addEventListener('touchstart', touchStart(index), { passive: true });
    slide.addEventListener('touchend', touchEnd, { passive: true });
    slide.addEventListener('touchmove', touchMove, { passive: true });
  });
};
slider();

/// //////////////////////////////////////
// Cookies Message
/// //////////////////////////////////////
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `We use cookies for improved functionality and analytics. 
  <button class="btn btn--close-cookie">Got it!</button>`;

document.body.prepend(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.parentElement.removeChild(message);
});

/// //////////////////////////////////////
// Menu Toggle
/// //////////////////////////////////////
const menu = document.querySelector('.js-nav-links');
const btnMenu = document.querySelector('.js-menu-btn');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('nav--icon-active');
  menu.classList.toggle('nav__links--active');
  document.body.classList.toggle('overflow-handler');

  nav.style.background = '#f3f3f3';

  if (menu.classList.contains('nav__links--active'))
    nav.style.background = '#fff';
});

// Closing menu after link clicked
document.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => {
    menu.classList.remove('nav__links--active');
    btnMenu.classList.remove('nav--icon-active');
    document.body.classList.remove('overflow-handler');
  }),
);
