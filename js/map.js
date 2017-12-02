'use strict';
var advCount = 8;
var userAvatars = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeTypes = ['flat', 'house', 'bungalo'];
var checkInTimeMarks = ['12:00', '13:00', '14:00'];
var checkOutTimeMarks = ['12:00', '13:00', '14:00'];

var getRandomLocationCoordinates = function (start, end) {
  var coordinates = [];

  for (var i = start; i <= end; i++) {
    coordinates.push(i);
  }

  var result = coordinates.splice(Math.floor(Math.random() * coordinates.length), 1)[0];

  return result;
};

var getRandomPrice = function (priceStart, priceEnd) {
  var randomNumber = Math.floor(priceStart + Math.random() * priceEnd);
  return randomNumber;
};

var getRandomType = function () {
  var randomNumber = Math.floor(Math.random() * placeTypes.length);
  return placeTypes[randomNumber];
};

var getRandomCheckIn = function () {
  var randomNumber = Math.floor(Math.random() * checkInTimeMarks.length);
  return checkInTimeMarks[randomNumber];
}

var getRandomCheckOut = function () {
  var randomNumber = Math.floor(Math.random() * checkOutTimeMarks.length);
  return checkOutTimeMarks[randomNumber];
}

var getRandomCount = function (minCount, maxCount) {
  var randomNumber = Math.floor(minCount + Math.random() * maxCount);
  return randomNumber;
};

var getFeatures = function () {
  var fixedOfferFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerFeatures = [];
  for (var i = 0; i < 1 + Math.floor(Math.random() * fixedOfferFeatures.length); i++) {
    offerFeatures.push(fixedOfferFeatures[i]);
  }
  
  return offerFeatures;
};

var renderAdvertisements = function () {
  var locationX = getRandomLocationCoordinates(300, 900);
  var locationY = getRandomLocationCoordinates(100, 500);
  var advertisement = {
    "author": {
      "avatar": 'img/avatars/user0' + (1 + Math.floor(Math.random() * userAvatars)) + '.png'
    },
    "offer": {
      "title": offerTitles[Math.floor(Math.random() * offerTitles.length)],
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
  
  return advertisement;
};

var renderMapPins = function (advertisement) {
  var mapPin = document.createElement('button');
  var mapPinWidth = 40;
  var mapPinHeight = 62;
  
  mapPin.className = 'map__pin';
  mapPin.style.left = advertisement.location.x + 'px';
  mapPin.style.top = advertisement.location.y + 'px';
  mapPin.innerHTML = '<img src="' + advertisement.author.avatar + '" width="40" height="40" draggable="false">';
  
  return mapPin;
};

var fragment = document.createDocumentFragment();

var mapElement = document.querySelector('.map');
var mapPinElement = document.querySelector('.map__pins');

mapElement.classList.remove('map--faded');

for (var i = 0; i < advCount; i++) {
  var advertisement = renderAdvertisements();
  var mapPins = renderMapPins(advertisement);
  
  fragment.appendChild(mapPins);
}

mapPinElement.appendChild(fragment);
