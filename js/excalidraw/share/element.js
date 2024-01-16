export function createElement(elementName, attrs = {}) {
  return Object.assign(document.createElement(elementName), attrs);
}

export function createInnerHTML(innerHTML) {
  const $container = createElement("div");
  $container.innerHTML = innerHTML;
  return $container.firstElementChild;
}
