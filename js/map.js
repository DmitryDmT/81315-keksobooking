'use strict';
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

var getAdvertisements = function (advCount) {
  for (var i = 0; i < advCount; i++) {
    var advertisements = [];
    var locationX = getRandomLocationCoordinates(300, 900);
    var locationY = getRandomLocationCoordinates(100, 500);

    advertisements[i] = {
      "author": {
        "avatar": 'img/avatars/user0' + (1 + Math.floor(Math.random() * userAvatars)) + '.png'
      },
      "offer": {
        "title": offerTitles[Math.floor(Math.random() * offerTitles.length)],
        "address": 'Адрес - ' + locationX + ', ' + locationY,
        "price": 'Цена - ' + getRandomPrice(1000, 999000),
        "type": 'Тип помещения - ' + getRandomType(),
        "rooms": 'Количество комнат - ' + getRandomCount(1, 5),
        "guests": 'Количество гостей - ' + getRandomCount(1, 10),
        "checkin": 'Время регистрации - ' + getRandomCheckIn(),
        "checkout": 'Время выписки - ' + getRandomCheckOut(),
        "features": 'Особенности - ' + getFeatures(),
        "description": '',
        "photos": []
      },
      "location": {
        "x": 'Координата x - ' + locationX,
        "y": 'Координата y - ' + locationY
      }
    };
  }
  
  return advertisements;
};

var advertisements = getAdvertisements(8);

document.querySelector('.map').classList.remove('map--faded');
