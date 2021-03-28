import {renderElement} from './utils.js'

const cardTypeToName = {
  'flat':     'Квартира',
  'bungalow': 'Бунгало',
  'house':    'Дом',
  'palace':   'Дворец',
}

const createCardFeatures = (features) => {
  return features
    .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('');
}

const createCardPhotos = (photos) => {
  return photos
    .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('');
}

export const createCardTemplate = (card, template) => {
  const {
    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    },
    author: {
      avatar,
    },
  } = card;

  const cardElement = template.cloneNode(true);

  const popupNodes = {
    TITLE: cardElement.querySelector('.popup__title'),
    ADDRESS: cardElement.querySelector('.popup__text--address'),
    PRICE: cardElement.querySelector('.popup__text--price'),
    TYPE: cardElement.querySelector('.popup__type'),
    CAPACITY: cardElement.querySelector('.popup__text--capacity'),
    TIME: cardElement.querySelector('.popup__text--time'),
    FEATURES: cardElement.querySelector('.popup__features'),
    DESCRIPTION: cardElement.querySelector('.popup__description'),
    PHOTOS: cardElement.querySelector('.popup__photos'),
    AVATAR: cardElement.querySelector('.popup__avatar'),
  };

  renderElement(title, popupNodes.TITLE, title,'textContent');
  renderElement(address, popupNodes.ADDRESS, address,'textContent');
  renderElement(price, popupNodes.PRICE, `${price} ₽/ночь`,'textContent');
  renderElement(type, popupNodes.TYPE, cardTypeToName[type],'textContent');
  renderElement(features, popupNodes.FEATURES, createCardFeatures(features),'innerHTML');
  renderElement(description, popupNodes.DESCRIPTION, description, 'textContent');
  renderElement(photos, popupNodes.PHOTOS, createCardPhotos(photos), 'innerHTML');
  renderElement(avatar, popupNodes.AVATAR, avatar, 'src');
  renderElement((rooms && guests), popupNodes.CAPACITY, `${rooms} комнаты для ${guests} гостей`,'textContent');
  renderElement((checkin && checkout), popupNodes.TIME, `Заезд после ${checkin}, выезд до ${checkout}`,'textContent');

  return cardElement;
}
