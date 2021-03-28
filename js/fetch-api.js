const Url = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  SEND: 'https://22.javascript.pages.academy/keksobooking',
};

export const getData = (onSuccess, onError) => {
  fetch(Url.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Произошла ошибка получения данных!');
    })
    .then((ads) => onSuccess(ads))
    .catch((error) => onError(error));
};

export const sendData = (onSuccess, onError, body) => {
  fetch(Url.SEND, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};
