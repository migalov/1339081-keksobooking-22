import {isEscEvent} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

const successElement = successTemplateElement.cloneNode(true);
const errorElement = errorTemplateElement.cloneNode(true);
const closeErrorElement = errorElement.querySelector('.error__button');

successElement.classList.add('hidden');
errorElement.classList.add('hidden');

document.body.appendChild(successElement);
document.body.appendChild(errorElement);

const errorEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    closeErrorHandler();
  }
}
const successEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessHandler();
  }
}

const errorClickHandler = (evt) => {
  const errorMessageElement = errorElement.querySelector('.error__message');

  if (evt.target !== errorMessageElement) {
    closeErrorHandler();
  }
};
const successClickHandler = (evt) => {
  const successMessageElement = successElement.querySelector('.success__message');

  if (evt.target !== successMessageElement) {
    closeSuccessHandler();
  }
};

const closeErrorHandler = () => {
  errorElement.classList.add('hidden');

  closeErrorElement.removeEventListener('click', closeErrorHandler);
  document.removeEventListener('keydown', errorEscKeydownHandler);
  document.removeEventListener('click', errorClickHandler);
};
const closeSuccessHandler = () => {
  successElement.classList.add('hidden');

  document.removeEventListener('keydown', successEscKeydownHandler);
  document.removeEventListener('click', successClickHandler);
};

export const renderError = () => {
  errorElement.classList.remove('hidden');

  closeErrorElement.addEventListener('click', closeErrorHandler);
  document.addEventListener('keydown', errorEscKeydownHandler);
  document.addEventListener('click', errorClickHandler);
};

export const renderSuccess = () => {
  successElement.classList.remove('hidden');

  document.addEventListener('keydown', successEscKeydownHandler);
  document.addEventListener('click', successClickHandler);
}

export const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
