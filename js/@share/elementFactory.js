export function createElement(element, attrs = {}) {
  const $element = document.createElement(element);
  return Object.assign($element, attrs);
}
export function createInnerHTML(innerHTML) {
  const $container = document.createElement("div");
  $container.innerHTML = innerHTML;
  return $container.firstElementChild;
}
