import Component from '../../component.js'

export default class ProductViewer extends Component{
  constructor({ element }) {
    super({ element });

    this._on('click', 'back-button', () => {
      this.emit('back');
    });

    this._on('click', 'add-button', () => {
      this.emit('add', this._phone.id);
    });

    this._on('click', 'product-img', ev => {
        this._mainImg.setAttribute('src', ev.target.getAttribute('src'));
    });
  }

  show(phoneDetails) {
    this._phone = phoneDetails;
    this._render();
    this._mainImg = document.querySelector('#mainImg');
    super.show();
  }

  _render() {
    const { images, name, description } = this._phone;

    this._element.innerHTML = `
      <img id="mainImg" class="phone" src="${ images[0] }">

      <button data-element="back-button">
        Back
      </button>
      
      <button data-element="add-button">
        Add to basket
      </button>
  
      <h1>${ name }</h1>
  
      <p>${ description }</p>
  
      <ul class="phone-thumbs">
        ${ images.map(image => `
          <li>
            <img src="${ image }" data-element="product-img">
          </li>
        `).join('')}
      </ul>
    `;
  }
}
