'use strict';

(function () {
  var template = document.querySelector('template').content.querySelector('.map__card');
  var mapFiltersContainer = window.utils.mapBlock.querySelector('.map__filters-container');
  var currentPopup = null;
  var popupCloseButton;

  var getChangeableTypes = function (type) {
    var placesObj = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };

    for (var key in placesObj) {
      return placesObj[type];
    }
  };

  var renderMapCards = function (advertisement) {
    var mapCard = template.cloneNode(true);

    mapCard.querySelector('h3').textContent = advertisement.offer.title;
    mapCard.querySelector('p:nth-of-type(1)').textContent = advertisement.offer.address;
    mapCard.querySelector('.popup__price').innerHTML = advertisement.offer.price + '&#x20bd;/ночь';
    mapCard.querySelector('h4').textContent = getChangeableTypes(advertisement.offer.type);
    mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' для ' + advertisement.offer.guests + ' гостей';
    mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
    for (var stepLiIndex = 0; stepLiIndex < advertisement.offer.features.length; stepLiIndex++) {
      var featureElement = document.createElement('li');

      featureElement.classList.add('feature', 'feature--' + advertisement.offer.features[stepLiIndex]);
      mapCard.querySelector('.popup__features').appendChild(featureElement);
    }

    mapCard.querySelector('.popup__avatar').setAttribute('src', advertisement.author.avatar);

    return mapCard;
  };

  var escCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.card.getPopupClose();
    }

    document.removeEventListener('keydown', escCloseKeydownHandler);
  };

  var popupCloseButtonClickHandler = function () {
    window.card.getPopupClose();

    popupCloseButton.removeEventListener('click', popupCloseButtonClickHandler);
  };

  var enterCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      window.card.getPopupClose();
    }

    popupCloseButton.removeEventListener('keydown', enterCloseKeydownHandler);
  };

  var getPopupOpen = function (clickedElmnt) {
    if (clickedElmnt.dataset.adIndex) {
      var advertisement = window.data.advertisements[clickedElmnt.dataset.adIndex];
      currentPopup = window.card.renderMapCards(advertisement);
      popupCloseButton = currentPopup.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', popupCloseButtonClickHandler);
      popupCloseButton.addEventListener('keydown', enterCloseKeydownHandler);
      document.addEventListener('keydown', escCloseKeydownHandler);

      window.utils.mapBlock.insertBefore(currentPopup, mapFiltersContainer);
    }
  };

  var getPopupClose = function () {
    var mapPinActive = window.pin.mapPins.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }

    if (currentPopup) {
      window.utils.mapBlock.removeChild(currentPopup);
      currentPopup = null;
    }
  };

  window.card = {
    currentPopup: currentPopup,
    renderMapCards: renderMapCards,
    getPopupOpen: getPopupOpen,
    getPopupClose: getPopupClose
  };
})();
