import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // new code
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // update(data) {
  //   // if (!data || (Array.isArray(data) && data.length === 0))
  //   //   return this.renderError();
  //   this._data = data;
  //   const newMarkUp = this._generateMarkup();
  //   // const newDOM = Array.from(
  //   //   document.createRange().createContextualFragment(newMarkUp)
  //   // );
  //   const newDOM = document.createRange().createContextualFragment(newMarkUp);

  //   const newElements = Array.from(newDOM.querySelectorAll('*'));
  //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));
  //   newElements.forEach(
  //     (newEl,
  //     i => {
  //       const curEl = curElements[i];
  //       // updating the elements value
  //       if (
  //         !newEl.isEqualNode(curEl) &&
  //         newEl.firstChild?.nodeValue.trim() !== ''
  //       ) {
  //         curEl.textContent = newEl.textContent;
  //       }
  //       // updating the attributes value
  //       if (!newEl.isEqualNode(curEl)) {
  //         Array.from(newEl.attributes).forEach(att =>
  //           curEl.setAttribute(att.name, att.value)
  //         );
  //         // this._parentElement.appendChild(newEl);
  //       }
  //     })
  //   );
  // }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
