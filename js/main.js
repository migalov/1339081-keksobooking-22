import {
  setFormDefault,
  bindSelectToInputHandler,
  syncSelectElementsHandler,
  selectValidateHandler,
  titleValidateHandler,
  priceValidateHandler} from './form.js';
import {renderMap} from './map.js';
import {togglePageState} from './page-state.js';
import {sendData} from './fetch-api.js';
import {renderError, renderSuccess} from './messages.js';


// Подготовка основных элементов
const adFormElement = document.querySelector('.ad-form');
const buttonSubmitElement = document.querySelector('.ad-form__submit');
const filtersFormElement = document.querySelector('.map__filters');
const mapCanvasElement = document.querySelector('#map-canvas');
const adFormResetButton = document.querySelector('.ad-form__reset');

// Подготовка шаблона
const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

// Подготовка элементов основной формы
const FormFieldElement = {
  TITLE: adFormElement.querySelector('#title'),
  TYPE: adFormElement.querySelector('#type'),
  PRICE: adFormElement.querySelector('#price'),
  TIME_IN: adFormElement.querySelector('#timein'),
  TIME_OUT: adFormElement.querySelector('#timeout'),
  ADDRESS: adFormElement.querySelector('#address'),
  ROOMS: adFormElement.querySelector('#room_number'),
  CAPACITY: adFormElement.querySelector('#capacity'),
};

// Возвращает страницу к изначальному состоянию
togglePageState(false, adFormElement, filtersFormElement);
bindSelectToInputHandler(FormFieldElement.TYPE, FormFieldElement.PRICE);

// Рендеринг карты
const mainMarker = renderMap(
  mapCanvasElement,
  cardTemplateElement,
  FormFieldElement.ADDRESS,
  togglePageState.bind({}, true, adFormElement, filtersFormElement),
);

// Обработчик на select, тип жилья
FormFieldElement.TYPE.addEventListener('change', (evt) => {
  bindSelectToInputHandler(evt.target, FormFieldElement.PRICE);
});

// Обработчик на select, время заселения
FormFieldElement.TIME_IN.addEventListener('change', (evt) => {
  syncSelectElementsHandler(evt.target, FormFieldElement.TIME_OUT);
});

// Обработчик на select, время выезда
FormFieldElement.TIME_OUT.addEventListener('change', (evt) => {
  syncSelectElementsHandler(evt.target, FormFieldElement.TIME_IN);
});

// Валидация формы
buttonSubmitElement.addEventListener('click', () => {
  titleValidateHandler(FormFieldElement.TITLE);
  selectValidateHandler(FormFieldElement.ROOMS, FormFieldElement.CAPACITY);
  priceValidateHandler(FormFieldElement.PRICE);

  FormFieldElement.ROOMS.addEventListener('change', () => {
    FormFieldElement.ROOMS.setCustomValidity('');
  });
});

// Отправка формы
adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    ()=> {
      setFormDefault(adFormElement, filtersFormElement, mainMarker, FormFieldElement.ADDRESS);
      renderSuccess();
    },
    () => {
      renderError();
    },
    new FormData(evt.target));
});

// Очистка формы
adFormResetButton.addEventListener('click', () => {
  setFormDefault(adFormElement, filtersFormElement, mainMarker, FormFieldElement.ADDRESS);
});
