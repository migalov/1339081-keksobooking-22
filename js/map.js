/* global L:readonly */
import {getCoords} from './consts.js';
import {createCardTemplate} from './card-template.js';
import {getData} from './fetch-api.js';
import {showErrorAlert} from './messages.js';
import {bindMarkerToInputHandler} from './form.js';

const MapEvents = {
  LOAD: 'load',
  MOVEEND: 'moveend',
}
const Pins = {
  redPin: {
    URL: 'img/main-pin.svg',
    SIZE: [52, 52],
    ANCHOR_SIZE: [26, 52],
  },
  bluePin: {
    URL: 'img/pin.svg',
    SIZE: [52, 52],
    ANCHOR_SIZE: [26, 52],
  },
};
const Tile = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

const createCustomPopup = (card, cardTemplate) => {
  return createCardTemplate(card, cardTemplate);
};

const onError = (errorMessage) => {
  showErrorAlert(errorMessage);
};

export const renderMap = (container, popupTemplate, inputElement, activatePage) => {
  const map = L.map(container)
    .on(MapEvents.LOAD, () => {
      activatePage();
      bindMarkerToInputHandler(L.latLng(getCoords.LAT, getCoords.LNG), inputElement);
    })
    .setView(L.latLng(getCoords.LAT, getCoords.LNG), 8);

  const tile = L.tileLayer(
    Tile.URL,
    {
      attribution: Tile.ATTRIBUTION,
    },
  );

  const mainPinMarker = L.icon({
    iconUrl: Pins.redPin.URL,
    iconSize: Pins.redPin.SIZE,
    iconAnchor: Pins.redPin.ANCHOR_SIZE,
  });

  const pinMarker = L.icon({
    iconUrl: Pins.bluePin.URL,
    iconSize: Pins.bluePin.SIZE,
    iconAnchor: Pins.bluePin.ANCHOR_SIZE,
  });

  const mainMarker = L.marker(
    {
      lat: getCoords.LAT,
      lng: getCoords.LNG,
    },
    {
      draggable: true,
      icon: mainPinMarker,
    },
  );

  mainMarker.on(MapEvents.MOVEEND, (evt) => {
    bindMarkerToInputHandler(evt.target.getLatLng(), inputElement);
  });

  mainMarker.addTo(map);
  tile.addTo(map);

  getData(
    (cards) => {
      cards.forEach((card) => {
        const {location: {lat, lng}} = card;

        const marker = L.marker(
          {
            lat: lat,
            lng: lng,
          },
          {
            icon: pinMarker,
          },
        );

        marker
          .addTo(map)
          .bindPopup(
            createCustomPopup(card, popupTemplate),
            {
              keepInView: true,
            },
          );
      });
    },
    (error) => {onError(error)},
  );

  return mainMarker;
};
