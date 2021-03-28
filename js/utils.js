const RenderProperty = {
  TEXT_CONTENT: 'textContent',
  INNER_HTML: 'innerHTML',
  SRC: 'src',
};

const Key = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

export const getRandomIntInclusive = (min = 0, max = 1) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0) {
    throw new Error('Ошибка! Минимальное значение меньше 0');
  }

  if (min === max) {
    throw new Error('Ошибка! Минимальное значение равно максимальному');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFloatInclusive = (min = 0, max = 1, precision = 0) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0) {
    throw new Error('Ошибка! Минимальное значение меньше 0');
  }

  if (min === max) {
    throw new Error('Ошибка! Минимальное значение равно максимальному');
  }

  return (Math.random() * (max - min + 1) + min).toFixed(precision);
};

// Добавляем нули перед числом
export const prependZero = (mainNumber, countNeedNumbers) => {

  mainNumber = String(mainNumber);

  while(mainNumber.length < countNeedNumbers) {
    mainNumber = '0' + mainNumber;
  }

  return String(mainNumber);

}

export const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(elements.length - 1)];
};

export const getRandomArray = (array) => {
  const newArray = array.filter(() => {
    return getRandomIntInclusive();
  });

  return newArray.length !== 0
    ? newArray
    : array;
};

export const getRandomArrayFrom = (array) => {
  return new Array(getRandomIntInclusive(10))
    .fill('')
    .map(() => {
      return array[getRandomIntInclusive(array.length - 1)];
    });
};

export const renderElement = (data, element, content, property) => {
  if (data) {
    switch (property) {
      case RenderProperty.TEXT_CONTENT:
        element.textContent = content;
        break;
      case RenderProperty.INNER_HTML:
        element.innerHTML = content;
        break;
      case RenderProperty.SRC:
        element.src = content;
        break;
      default:
        throw new Error(`Ошибка! Неизвестное свойство ${property}`);
    }
  } else {
    element.remove();
  }
}

export const isEscEvent = (evt) => {
  return evt.key === Key.ESCAPE || evt.key === Key.ESC;
};
