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

var getRandomValue = function (arrayLength) {
  var min = 0;
  var max = arrayLength - 1;
  var randomValue = Math.round(Math.random() * (max - min) + min);

  return randomValue;
};

var getUniqueRandomElement = function (array) {
  var randVal = getRandomValue(array.length);
  var result = array.splice(randVal, 1)[0];

  return result;
};

var getRandomElement = function (array) {
  var result = getRandomValue(array.length);

  return array[result];
};

var getRandomNumber = function (min, max) {
  var result = Math.round(Math.random() * (max - min) + min);
  
  return result;
}

var getFeatures = function () {
  var fixedOfferFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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

var renderAdvertisements = function () {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);
  var advertisement = {
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

  return advertisement;
};

var fragmentPin = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

var mapElement = document.querySelector('.map');
var mapPinElement = mapElement.querySelector('.map__pins');
var mapFiltersContainer = mapElement.querySelector('.map__filters-container');
var template = document.querySelector('template').content.querySelector('.map__card');

mapElement.classList.remove('map--faded');

var renderMapPins = function (advertisement) {
  var mapPin = document.createElement('button');
  var mapPinWidth = 40;
  var mapPinHeight = 62;

  mapPin.className = 'map__pin';
  mapPin.style.left = advertisement.location.x - mapPinWidth / 2 + 'px';
  mapPin.style.top = advertisement.location.y + mapPinHeight + 'px';
  mapPin.innerHTML = '<img src="' + advertisement.author.avatar + '" width="40" height="40" draggable="false">';

  return mapPin;
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

for (var stepCreateIndex = 0; stepCreateIndex < advCount; stepCreateIndex++) {
  var advertisement = renderAdvertisements();
  var mapPins = renderMapPins(advertisement);
  var mapCards = renderMapCards(advertisement);

  fragmentPin.appendChild(mapPins);
  fragmentCard.appendChild(mapCards);
}

mapPinElement.appendChild(fragmentPin);
mapElement.insertBefore(fragmentCard, mapFiltersContainer);
