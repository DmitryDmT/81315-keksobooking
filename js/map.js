'use strict';
var advCount = 8;
var userAvatars = 8;
var fixedOfferTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeTypes = ['flat', 'house', 'bungalo'];
var checkInTimeMarks = ['12:00', '13:00', '14:00'];
var checkOutTimeMarks = ['12:00', '13:00', '14:00'];

var pictureCount = 8;
var pictureNumbers = [];
for (var i = 0; i < pictureCount; i++) {
  pictureNumbers.push(i + 1);
}

var startX = 300;
var endX = 901;
var coordinatesX = [];
for (var i = startX; i <= endX; i++) {
  coordinatesX.push(i);
}

var startY = 100;
var endY = 501;
var coordinatesY = [];
for (var i = startY; i <= endY; i++) {
  coordinatesY.push(i);
}

var getRandomValue = function(arrayLength) {
  var min = 0;
  var max = arrayLength - 1;
  var randomValue = Math.round(Math.random() * (max - min) + min);

  return randomValue;
};

var getRandomNumber = function(array) {
  var randVal = getRandomValue(array.length);
  var result = array.splice(randVal, 1)[0];

  return result;
};

var getRandomPrice = function(priceStart, priceEnd) {
  var randomNumber = Math.floor(priceStart + Math.random() * priceEnd);
  return randomNumber;
};

var getRandomType = function() {
  var randomNumber = Math.floor(Math.random() * placeTypes.length);
  return placeTypes[randomNumber];
};

var getRandomCheckIn = function() {
  var randomNumber = Math.floor(Math.random() * checkInTimeMarks.length);
  return checkInTimeMarks[randomNumber];
};

var getRandomCheckOut = function() {
  var randomNumber = Math.floor(Math.random() * checkOutTimeMarks.length);
  return checkOutTimeMarks[randomNumber];
};

var getRandomCount = function(minCount, maxCount) {
  var randomNumber = Math.floor(minCount + Math.random() * maxCount);
  return randomNumber;
};

var getFeatures = function() {
  var fixedOfferFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerFeatures = [];

  for (var i = 0; i < 1 + Math.floor(Math.random() * fixedOfferFeatures.length); i++) {
    offerFeatures.push(fixedOfferFeatures[i]);
  }

  return offerFeatures;
};

var getChangeableTypes = function(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  }
};

var renderAdvertisements = function() {
  var locationX = getRandomNumber(coordinatesX);
  var locationY = getRandomNumber(coordinatesY);
  var advertisement = {
    "author": {
      "avatar": 'img/avatars/user0' + getRandomNumber(pictureNumbers) + '.png'
    },
    "offer": {
      "title": getRandomNumber(fixedOfferTitles),
      "address": locationX + ', ' + locationY,
      "price": getRandomPrice(1000, 999000),
      "type": getRandomType(),
      "rooms": getRandomCount(1, 5),
      "guests": getRandomCount(1, 10),
      "checkin": getRandomCheckIn(),
      "checkout": getRandomCheckOut(),
      "features": getFeatures(),
      "description": '',
      "photos": []
    },
    "location": {
      "x": locationX,
      "y": locationY
    }
  };
console.log(locationX);
  console.log(advertisement.offer.title);
  return advertisement;
};

var fragmentPin = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

var mapElement = document.querySelector('.map');
var mapPinElement = mapElement.querySelector('.map__pins');
var mapFiltersContainer = mapElement.querySelector('.map__filters-container');
var template = document.querySelector('template').content.querySelector('.map__card');

mapElement.classList.remove('map--faded');

var renderMapPins = function(advertisement) {
  var mapPin = document.createElement('button');
  var mapPinWidth = 40;
  var mapPinHeight = 62;

  mapPin.className = 'map__pin';
  mapPin.style.left = advertisement.location.x - mapPinWidth / 2 + 'px';
  mapPin.style.top = advertisement.location.y + mapPinHeight + 'px';
  mapPin.innerHTML = '<img src="' + advertisement.author.avatar + '" width="40" height="40" draggable="false">';

  return mapPin;
};

var renderMapCards = function(advertisement) {
  var mapCard = template.cloneNode(true);

  mapCard.querySelector('h3').textContent = advertisement.offer.title;
  mapCard.querySelector('p:nth-of-type(1)').textContent = advertisement.offer.address;
  mapCard.querySelector('.popup__price').innerHTML = advertisement.offer.price + '&#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = getChangeableTypes(advertisement.offer.type);
  mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' для ' + advertisement.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = '';
  mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
  for (var i = 0; i < advertisement.offer.features.length; i++) {
    var featureElement = document.createElement('li');

    featureElement.classList.add('feature', 'feature--' + advertisement.offer.features[i]);
    mapCard.querySelector('.popup__features').appendChild(featureElement);
  }

  mapCard.querySelector('.popup__avatar').setAttribute('src', advertisement.author.avatar);

  return mapCard;
};

for (var i = 0; i < advCount; i++) {
  var advertisement = renderAdvertisements();
  var mapPins = renderMapPins(advertisement);
  var mapCards = renderMapCards(advertisement);

  fragmentPin.appendChild(mapPins);
  fragmentCard.appendChild(mapCards);
}

mapPinElement.appendChild(fragmentPin);
mapElement.insertBefore(fragmentCard, mapFiltersContainer);
