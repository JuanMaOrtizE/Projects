import * as model from './model.js';
import { MODAL_CLOSE_SECONDS } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

//Suscriber

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Update results view  para marcar el resultado seleccionado
    resultsView.update(model.getSearchResultsPage());

    if (!id) return;
    recipeView.renderSpinner();
    //accedemos en model a la función encargada de hacer el fetch del hash
    await model.loadRecipe(id);

    //renderizamos en view el objeto almacenado en model

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    //render nuevos resultados
    resultsView.render(model.getSearchResultsPage(), `pepito`);

    //render botones iniciales de paginación
    paginationView.render(model.state.search);
    console.log(`kljfsk`);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //render nuevos resultados
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render botones iniciales de paginación
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update Recipe en el objeto state
  model.updateServings(newServings);

  //Update recipeView

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  console.log(`entre
  `);
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipe) {
  try {
    console.log(`entre`);
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, ``, `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};

init();
