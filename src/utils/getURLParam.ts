/**
 * get the value of a URL parameter
 * @param param URL parameter you want a value for
 * @returns the value of the URL param or undefined
 */
export function getURLParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const param_ = urlParams.get(param);
  return param_ || undefined;
}
