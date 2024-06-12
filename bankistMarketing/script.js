'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabsContainer = document.querySelector('.operations__tab-container'); //contenedor padre de las tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(bnt => bnt.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//SCROLL

btnScrollTo.addEventListener(`click`, function (e) {
  // const sec1Coord = section1.getBoundingClientRect();
  // console.log(sec1Coord);

  //old way
  // window.scrollTo(sec1Coord.left, sec1Coord.top + window.pageYOffset);

  section1.scrollIntoView({ behavior: `smooth` });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

document.querySelector('.nav__links').addEventListener(`click`, function (e) {
  e.preventDefault();

  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// Tabbed component

tabsContainer.addEventListener(`click`, function (e) {
  console.log(e.target);
  const clicked = e.target.closest(`.btn`);
  console.log(clicked);

  if (!clicked) return;

  //Eliminar las clases activas
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));

  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));

  //Activar el tab
  clicked.classList.add(`operations__tab--active`);

  //Activar el contenido
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

//Menu fade

const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll`.nav__link`;
    const logo = link.closest(`.nav`).querySelector(`.nav__logo`);
    // console.log(siblings);

    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener(`mouseover`, handleHover.bind(0.5));

nav.addEventListener(`mouseout`, handleHover.bind(1));

//Sticky
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add(`sticky`);
  } else {
    nav.classList.remove(`sticky`);
  }
};

const objOptions = {
  root: null,
  thresold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, objOptions);
headerObserver.observe(header);

//Reveal sections

const allSections = document.querySelectorAll('.section ');
// console.log(allSections);
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // Dejar de observar esta sección
  }
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});
