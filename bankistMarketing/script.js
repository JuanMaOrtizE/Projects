'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
const tabsContainer = document.querySelector('.operations__tab-container'); //contenedor padre de las tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

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
