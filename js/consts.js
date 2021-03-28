import {prependZero} from './utils.js';

export const getCoords = {
  LAT: 35.681700,
  LNG: 139.753882,
}

const PATHS = {
  'avatars': 'img/avatars/user', // Путь к аватаркам
  'hotels': 'http://o0.github.io/assets/images/tokyo/hotel', // Путь к фото отеля
}

export const getArrayPaths = {
  'avatars': Array(8).fill(null).map((e,i) => {
    return PATHS.avatars + prependZero(i+1, 2) + '.png'
  }), // Генерируем массив путей к аватаркам
  'hotels': Array(3).fill(null).map((e,i) => {
    return PATHS.hotels + (i+1) + '.jpg'
  }), // Генерируем массив к фото отеля
}
