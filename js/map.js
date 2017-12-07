'use strict';
var advCount = 8;
var fixedOfferTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeTypes = ['flat', 'house', 'bungalo'];
var checkInTimeMarks = ['12:00', '13:00', '14:00'];
var checkOutTimeMarks = ['12:00', '13:00', '14:00'];
var fixedOfferFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var userAvatarsCount = 8;
var userAvatars = [];
for (var avatarIndex = 0; avatarIndex < userAvatarsCount; avatarIndex++) {
  userAvatars.push(avatarIndex + 1);
}

var fragment = document.createDocumentFragment();
var mapBlock = document.querySelector('.map');
var mapPins = mapBlock.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapFiltersContainer = mapBlock.querySelector('.map__filters-container');
var template = document.querySelector('template').content.querySelector('.map__card');
var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');

var getRandomValue = function (arrayLength) {
  var min = 0;
  var max = arrayLength - 1;

  return Math.round(Math.random() * (max - min) + min);
};

var getUniqueRandomElement = function (array) {
  var randVal = getRandomValue(array.length);

  return array.splice(randVal, 1)[0];
};

var getRandomElement = function (array) {
  var result = getRandomValue(array.length);

  return array[result];
};

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getFeatures = function () {
  var offerFeatures = [];

  for (var featuresIndex = 0; featuresIndex < 1 + Math.floor(Math.random() * fixedOfferFeatures.length); featuresIndex++) {
    offerFeatures.push(fixedOfferFeatures[featuresIndex]);
  }

  return offerFeatures;
};

var getChangeableTypes = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  }

  return type;
};

var advertisements = [];

var renderAdvertisements = function () {
  for (var i = 0; i < advCount; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    advertisements[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + getUniqueRandomElement(userAvatars) + '.png'
      },
      'offer': {
        'title': getUniqueRandomElement(fixedOfferTitles),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(1000, 999000),
        'type': getRandomElement(placeTypes),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 10),
        'checkin': getRandomElement(checkInTimeMarks),
        'checkout': getRandomElement(checkOutTimeMarks),
        'features': getFeatures(),
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }

  return advertisements;
};

renderAdvertisements();

var renderMapPins = function (advertisement) {
  var mapPinWidth = 40;
  var mapPinHeight = 62;
  for (var i = 0; i < advertisements.length; i++) {
    var mapPin = document.createElement('button');

    mapPin.className = 'map__pin';
    mapPin.style.left = advertisement[i].location.x - mapPinWidth / 2 + 'px';
    mapPin.style.top = advertisement[i].location.y + mapPinHeight + 'px';
    mapPin.innerHTML = '<img src="' + advertisement[i].author.avatar + '" width="40" height="40" draggable="false">';

    fragment.appendChild(mapPin);
  }

  return fragment;
};

var renderMapCards = function (advertisement) {
  var mapCard = template.cloneNode(true);

  mapCard.querySelector('h3').textContent = advertisement[0].offer.title;
  mapCard.querySelector('p:nth-of-type(1)').textContent = advertisement[0].offer.address;
  mapCard.querySelector('.popup__price').innerHTML = advertisement[0].offer.price + '&#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = getChangeableTypes(advertisement[0].offer.type);
  mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement[0].offer.rooms + ' для ' + advertisement[0].offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement[0].offer.checkin + ', выезд до ' + advertisement[0].offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = '';
  mapCard.querySelector('p:last-of-type').textContent = advertisement[0].offer.description;
  for (var stepLiIndex = 0; stepLiIndex < advertisement[0].offer.features.length; stepLiIndex++) {
    var featureElement = document.createElement('li');

    featureElement.classList.add('feature', 'feature--' + advertisement[0].offer.features[stepLiIndex]);
    mapCard.querySelector('.popup__features').appendChild(featureElement);
  }

  mapCard.querySelector('.popup__avatar').setAttribute('src', advertisement[0].author.avatar);

  return mapCard;
};

var getDisabledForm = function () {
  for (var i = 0; i < noticeFormFieldsets.length; i++) {
    noticeFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

var getEnabledForm = function () {
  renderMapPins(advertisements);
  mapPins.appendChild(fragment);
  noticeForm.classList.remove('notice__form--disabled');
  for (var i = 0; i < noticeFormFieldsets.length; i++) {
    noticeFormFieldsets[i].removeAttribute('disabled');
  }
};

getDisabledForm();

//var mapCard = renderMapCards(advertisements);
//mapBlock.insertBefore(mapCard, mapFiltersContainer);

mapPinMain.addEventListener('mouseup', function () {
  mapBlock.classList.remove('map--faded');
  getEnabledForm();
});
