import Component from '../../component.js'

export default class ProductCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this._on('click', 'phone-details-link', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phoneSelected', phoneElement.dataset.phoneId);
    });

    this._on('click', 'add-button', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('add', phoneElement.dataset.phoneId);
    });
  }

  show(phones) {
    this._phones = phones;
    this._render();

    super.show();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
          <li
            class="thumbnail"
            data-element="phone"
            data-phone-id="${ phone.id }"
          >
            <a
              href="#${ phone.id }"
              class="thumb"
              data-element="phone-details-link"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="add-button">
                Add
              </a>
            </div>
  
            <a
              href="#${ phone.id }"
              data-element="phone-details-link"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
    `;
  }
}
