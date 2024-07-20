import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';

// https://forkify-api.herokuapp.com/v2

//Suscriber

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
