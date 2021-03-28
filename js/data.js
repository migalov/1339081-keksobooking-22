import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArray, getRandomArrayFrom, getArrayPaths} from './utils.js';


const ADS_COUNT = 10;
const Coords = {
  X_MIN: 35.65000,
  X_MAX: 35.70000,
  Y_MIN: 139.70000,
  Y_MAX: 139.80000,
  PRECISION: 5,
};
const Offer = {
  TITLES: ['Lorem ipsum dolor',
    'Pellentesque consequat lobortis',
    'Morbi et tincidunt urna',
    'Vivamus a aliquam urna',
    'Aliquam ornare justo sed enim scelerisque',
    'Sed tempor nec velit non feugiat',
    'Praesent sed nibh malesuada',
    'Integer magna dui'],
  TYPES: ['palace', 'flat', 'house', 'bungalow'],  // Типы номера
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], // Время выхода
  CHECKS: ['12:00', '13:00', '14:00'], // Время заселения и выхода
  PHOTOS: getArrayPaths.hotels,
};

const getCoords = () => {
  return {
    x: getRandomFloatInclusive(Coords.X_MIN, Coords.X_MAX, Coords.PRECISION),
    y: getRandomFloatInclusive(Coords.Y_MIN, Coords.Y_MAX, Coords.PRECISION),
  }
};

const createAd = () => {
  const coords = getCoords();

  return {
    author: {
      avatar: getRandomArrayElement(getArrayPaths.avatars),
    },
    offer: {
      title: getRandomArrayElement(Offer.TITLES),
      address: `${coords.x}, ${coords.y}`,
      price: getRandomIntInclusive(2000, 30000),
      type: getRandomArrayElement(Offer.TYPES),
      rooms: getRandomIntInclusive(1, 5),
      guests: getRandomIntInclusive(1, 5),
      checkin: getRandomArrayElement(Offer.CHECKS),
      checkout: getRandomArrayElement(Offer.CHECKS),
      features: getRandomArray(Offer.FEATURES),
      description: getRandomArrayElement(Offer.TITLES),
      photos: getRandomArrayFrom(Offer.PHOTOS),
    },
    location: {
      x: coords.x,
      y: coords.y,
    },
  }
};

export const createCards = () => new Array(ADS_COUNT)
  .fill('')
  .map(() => createAd());
