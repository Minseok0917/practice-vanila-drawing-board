export function createElement(elementName, attrs = {}) {
  return Object.assign(document.createElement(elementName), attrs);
}

export function createInnerHTML(innerHTML) {
  const $container = createElement("div");
  $container.innerHTML = innerHTML;
  return $container.firstElementChild;
}

export function addClass($element, className) {
  $element.classList.add(className);
}

export function removeClass($element, className) {
  return $element.classList.remove(className);
}

export function hasClass($element, className) {
  return $element.classList.contains(className);
}

export function updateStyled($element, styles) {
  Object.assign($element.style, styles);
}
