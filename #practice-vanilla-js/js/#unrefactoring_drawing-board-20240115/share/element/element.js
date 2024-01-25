export class Element {
  #$element;

  constructor(elementName, attrs = {}) {
    this.#$element = ElementFactory.createElement(elementName, attrs);
  }

  get $element() {
    return this.#$element;
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }

  hasClass(className) {
    return this.#$element.classList.contains(className);
  }
}
