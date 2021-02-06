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

alert(
  'Случайное число: ' + getRandomNumber(0, 5) + '\n' +
  'Случайное положительное число, где max <= min: ' + getRandomNumber(10, 3) + '\n' +
  'Случайная положительная десятичная дробь:' + getRandomCoordinate(0,3.1, 4) + '\n' +
  'Случайная положительная десятичная дробь, где max <= min: ' + getRandomCoordinate(2.7,2.4, 1) + '\n' +
  'Попытка вставить отрицательное число и отрицательную десятичную дробь соответственно: ' + getRandomNumber(-5, 2) + ' и ' + getRandomCoordinate(-4.7,-2.2, 1));
