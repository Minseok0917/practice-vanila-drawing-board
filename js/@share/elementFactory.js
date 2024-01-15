export class ElementFactory {
  static createElement(element, attrs = {}) {
    const $element = document.createElement(element);
    return Object.assign($element, attrs);
  }
}
