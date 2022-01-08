/// ////////////////////////////////////
// DOM Elements
/// ////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

/// ////////////////////////////////////
// Modal window
/// ////////////////////////////////////
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
