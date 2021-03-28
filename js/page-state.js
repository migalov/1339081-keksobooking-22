export const togglePageState = (isActive, formElement, filterElement) => {
  if (isActive) {
    formElement.classList.remove('ad-form--disabled');
    filterElement.classList.remove('map__filters--disabled');

    Array.from(formElement.children).forEach(element => element.disabled = false);
    Array.from(filterElement.children).forEach(element => element.disabled = false);
  } else {
    formElement.classList.add('ad-form--disabled');
    filterElement.classList.add('map__filters--disabled');

    Array.from(formElement.children).forEach(element => element.disabled = true);
    Array.from(filterElement.children).forEach(element => element.disabled = true);
  }
};
