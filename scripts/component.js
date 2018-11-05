const settings = {
  hiddenClass: 'js-hidden'
};

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  hide() {
    this._element.classList.add(settings.hiddenClass);
  }

  show() {
    this._element.classList.remove(settings.hiddenClass);
  }

  subscribe (eventName, callback) {
    this._element.addEventListener(eventName, (event) => {
      callback(event.detail);
    });
  }

  emit (eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data
    });

    this._element.dispatchEvent(event);
  }

  _on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      let delegateTarget = event.target.closest(`[data-element="${elementName}"]`);

      if (!delegateTarget) {
        return;
      }

      callback(event);
    });
  }
}
