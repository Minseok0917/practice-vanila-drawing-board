export class ElementFactory {
  static createElement(elementName, attrs = {}) {
    return Object.assign(document.createElement(elementName), attrs);
  }
}
