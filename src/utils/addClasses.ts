/**
 * adds classes to an element, first parameter is the element to add classes
 * the rest are the classes to add
 * @param element element to add classes to
 * @param params classes to add to element ...params
 */
export function addClasses(element: HTMLElement, ...params: string[]) {
  element.classList.add(...params);
}
