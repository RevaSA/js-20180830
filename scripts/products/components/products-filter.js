import Component from '../../component.js';

export default class ProductsFilter extends Component {
  constructor({ element, timeUpdate }) {
    super({ element });

    this._render();

    this.settings = {
      timeUpdate
    };

    this._on('input', 'search', this._onChangeSearch.bind(this));
    this._on('change', 'sort', this._onChangeSort.bind(this));

    this._sortEl = element.querySelector('[data-element="sort"]');
  }

  _onChangeSearch(ev) {
    clearTimeout(this.timerId);

    this.timerId = setTimeout(() => {
      this.emit('search', ev.target.value);
    }, this.settings.timeUpdate);
  }

  _onChangeSort(ev) {
    this.emit('sort', ev.target.value);
  }

  getSortValue() {
    return this._sortEl.value;
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input
          type="text"
          data-element="search"
        >
      </p>

      <p>
        Sort by:
        <select data-element="sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
