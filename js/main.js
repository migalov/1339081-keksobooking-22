// Функции для генерации случайных чисел (Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

function getRandomNumber(min, max) {
  let r = Math.random();
  min = Math.ceil(min);
  max = Math.floor(max);

  if ((min < 0 || max < 0) && typeof min == 'number' && typeof max == 'number') {
    return false;
  }

  if (max < min) {
    return Math.floor(r * (max - min)) + min;
  }

  return Math.floor(r * (min - max)) + max; //Максимум и минимум включаются
}


function getRandomCoordinate(min, max, num) {

  let r = Math.random();

  if ((min < 0 || max < 0 || num < 0) && typeof min == 'number' && typeof max == 'number' && typeof num == 'number') {
    return false;
  }

  if (max < min) {
    return (r * (max - min) + min).toFixed(num);
  }

  return (r * (min - max) + max).toFixed(num);
}

getRandomNumber(0, 5);
getRandomCoordinate(0,3.1, 4);
getRandomNumber(-5, 2);

// Добавляет нули перед числом
function prependZero(mainNumber, countNeedNumbers) {

  mainNumber = String(mainNumber);

  while(mainNumber.length < countNeedNumbers) {
    mainNumber = '0' + mainNumber;
  }

  return String(mainNumber);

}

const URL_IMG_AVATARS = 'img/avatars/user'; // Путь к аватаркам
const URL_IMG_HOTEL = 'http://o0.github.io/assets/images/tokyo/hotel'; // Путь к фото отеля
const COUNTS_PHOTOS_AVATARS = 8; // Кол-во аватарок
const COUNTS_PHOTOS_HOTEL = 3; // Кол-во фото отеля
const NUMBER_OF_GENERATED_OBJECTS = 10; // Кол-во генерируемых объектов

const PATHS_AVATARS = Array(COUNTS_PHOTOS_AVATARS).fill(null).map((e,i) => {
  return URL_IMG_AVATARS + prependZero(i+1, 2) + '.png'
}); // Генерируем массив путей к аватаркам

const PATHS_PHOTO_HOTEL = Array(COUNTS_PHOTOS_HOTEL).fill(null).map((e,i) => {
  return URL_IMG_HOTEL + (i+1) + '.jpg'
}); // Генерируем массив к фото отеля

const TITLES = [
  'Lorem ipsum dolor',
  'Pellentesque consequat lobortis',
  'Morbi et tincidunt urna',
  'Vivamus a aliquam urna',
  'Aliquam ornare justo sed enim scelerisque',
  'Sed tempor nec velit non feugiat',
  'Praesent sed nibh malesuada',
  'Integer magna dui']; // Заголовки

const PRICES = Array(COUNTS_PHOTOS_HOTEL).fill(null).map(()=> {
  return getRandomNumber(10000, 100000)
}); // Цены

const TYPES_OF_ROOM = ['palace', 'flat', 'house', 'bungalow']; // Типы номера

const CHECKIN = ['12:00', '13:00', '14:00'] // Время заселения
const CHECKOUT = CHECKIN; // Время выхода
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'] // Преимушества

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length)];
};

const getRandomArray = (array) => {

  let resultArray = [];
  let tempElement = null;
  let checkUniqueElement = true;

  while (checkUniqueElement) {

    tempElement = getRandomArrayElement(array);

    if(!resultArray.includes(tempElement)) {
      resultArray.push(tempElement);
    }
    else {
      checkUniqueElement = false;
    }
  }
  return resultArray;

}

const sellersList = () => {
  return {
    author: {
      avatar: getRandomArrayElement(PATHS_AVATARS),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: {
        x: getRandomCoordinate(35.65, 35.7, 5),
        y: getRandomCoordinate(139.7, 139.8, 5),
      },
      price: getRandomArrayElement(PRICES),
      type: getRandomArrayElement(TYPES_OF_ROOM),
      rooms: getRandomNumber(0, 5),
      guests: getRandomNumber(0, 5),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(TITLES),
      photos: PATHS_PHOTO_HOTEL,
    },
  };
};

const similarClients = new Array(NUMBER_OF_GENERATED_OBJECTS).fill(null).map(() => sellersList());
/* eslint-disable no-debugger, no-console */
console.log(similarClients);
