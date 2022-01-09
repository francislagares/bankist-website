/// ////////////////////////////////////
// Modal window
/// ////////////////////////////////////
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
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
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
const nav = document.querySelector('.nav');

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

const stickyNav = (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null as Element,
  threshold: 0,
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
    entry.target.classList.remove('lazy-img');
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
