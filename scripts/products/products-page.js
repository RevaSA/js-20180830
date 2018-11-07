import ProductCatalog from './components/product-catalog.js';
import ProductViewer from './components/product-viewer.js';
import ProductsFilter from './components/products-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import ProductService from './services/product-service.js';

export default class ProductsPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilters();
  }

  _initCatalog () {
    this._catalog = new ProductCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._loadPhonesFromServer();

    this._catalog.subscribe('phoneSelected', (phoneId) => {
      ProductService.getPhone(phoneId)
        .then((phoneDetails) => {
          this._catalog.hide();
          this._viewer.show(phoneDetails);
        });
    });

    this._catalog.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });
  }

  _loadPhonesFromServer() {
    ProductService.getPhones()
      .then((phones) => {
        this._phones = this._foundPhones = phones;
        this._catalog.show(phones);
      });
  }

  _initViewer() {
    this._viewer = new ProductViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });

    this._viewer.subscribe('back', () => {
      if (window.history.replaceState) {
          window.history.replaceState({}, null, '/');
      }

      this._viewer.hide();
      this._loadPhonesFromServer();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilters() {
    this._filter = new ProductsFilter({
      element: this._element.querySelector('[data-component="phones-filter"]'),
      timeUpdate: 500
    });

    this._filter.subscribe('search', value => {
        let phones = [];

        if (value.length >= 3) {
          phones = this._phones.filter(phone => {
            return phone.name.toLowerCase().includes(value.toLowerCase());
          });
        }

        this._foundPhones = phones.length >= 1 ? phones : this._phones;
        this._filter.emit('sort', this._filter.getSortValue());
    });

    this._filter.subscribe('sort', value => {
        this._catalog.show(this._foundPhones.sort((a, b) => {
          let [val1, val2] = [a[value], b[value]];

          if (typeof val1 === 'string') {
            val1 = val1.toLowerCase();
            val2 = val2.toLowerCase();
          }

          return val1 > val2 ? 1 : -1;
        }));
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="container-fluid">
        <div class="row">
      
          <!--Sidebar-->
          <div class="col-md-2">
            <section>
              <div data-component="phones-filter"></div>
            </section>
      
            <section>
              <div data-component="shopping-cart"></div>
            </section>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-catalog" class="js-hidden"></div>
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
    `;
  }
}
