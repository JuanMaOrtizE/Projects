import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view.js';
class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `No hay ingredientes para tu busqueda`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
}
export default new BookmarksView();
