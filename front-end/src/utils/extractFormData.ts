/**
 * extract form data as key value pairs
 * @param form form element to extract data from
 * @returns key, value pairs of the form data
 */
export function extractFormData(form: HTMLFormElement) {
  // stop if form element is unavailable
  if (!form) return;

  // stores the data from the form
  const data: { [key: string]: any } = {};

  // extract data into the store
  const formData = new FormData(form);
  formData.forEach((value: FormDataEntryValue, key: string) => {
    data[key] = value;
  });

  return data;
}
