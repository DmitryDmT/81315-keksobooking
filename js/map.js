'use strict';
var advCount = 8;
var userAvatars = 8;
var fixedOfferTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeTypes = ['flat', 'house', 'bungalo'];
var checkInTimeMarks = ['12:00', '13:00', '14:00'];
var checkOutTimeMarks = ['12:00', '13:00', '14:00'];

var getRandomLocationCoordinates = function(start, end) {
  var coordinates = [];

  for (var i = start; i <= end; i++) {
    coordinates.push(i);
  }

  var result = coordinates.splice(Math.floor(Math.random() * coordinates.length), 1)[0];
  return result;
};

var getRandomOfferTitle = function() {
  var offerTitles = [];

  for (var i = 0; i < fixedOfferTitles.length; i++) {
    offerTitles.push(fixedOfferTitles[i]);
  }

  var result = offerTitles.splice(Math.floor(Math.random() * offerTitles.length), 1)[0];
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
}

var getRandomCheckOut = function() {
  var randomNumber = Math.floor(Math.random() * checkOutTimeMarks.length);
  return checkOutTimeMarks[randomNumber];
}

var getRandomCount = function (minCount, maxCount) {
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

var featuresArr = getFeatures();

var getChangeableTypes = function(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  }
}

var renderAdvertisements = function() {
  var locationX = getRandomLocationCoordinates(300, 900);
  var locationY = getRandomLocationCoordinates(100, 500);
  var advertisement = {
    "author": {
      "avatar": 'img/avatars/user0' + (i + 1) + '.png'
    },
    "offer": {
      "title": getRandomOfferTitle(),
      "address": locationX + ', ' + locationY,
      "price": getRandomPrice(1000, 999000),
      "type": getRandomType(),
      "rooms": getRandomCount(1, 5),
      "guests": getRandomCount(1, 10),
      "checkin": getRandomCheckIn(),
      "checkout": getRandomCheckOut(),
      "features": featuresArr,
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
  mapCard.querySelector('.popup__features').innerHTML = '<li class="feature feature--' + advertisement.offer.features + '">';
  mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', advertisement.author.avatar);
  
  return mapCard;
};

for (var i = 0; i < advCount; i++) {
  var advertisement = renderAdvertisements();
  var mapPins = renderMapPins(advertisement);
  var mapCards = renderMapCards(advertisement);
  
  fragmentPin.appendChild(mapPins);
  fragmentCard.appendChild(mapCards);
  console.log(mapCards);
}

mapPinElement.appendChild(fragmentPin);
mapElement.insertBefore(fragmentCard, mapFiltersContainer);
