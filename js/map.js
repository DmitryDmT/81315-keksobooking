'use strict';

var advertisements = [];
var advCount = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeTypes = ['flat', 'house', 'bungalo'];

var randomLocationX = function (start, end) {
  var coordinatesX = [];

  for (var i = start; i <= end; i++) {
    coordinatesX.push(i);
  }

  var result = coordinatesX.splice(Math.floor(Math.random() * coordinatesX.length), 1);

  return result;
};

var randomLocationY = function (start, end) {
  var coordinatesY = [];

  for (var i = start; i <= end; i++) {
    coordinatesY.push(i);
  }

  var result = coordinatesY.splice(Math.floor(Math.random() * coordinatesY.length), 1);
  
  return result;
};

var priceStart = 1000;
var priceEnd = 999000;

var randomPrice = function () {
  var randomNumber = Math.floor(priceStart + Math.random() * priceEnd);

  return randomNumber;
};

var randomType = function () {
  var randomNumber = Math.floor(Math.random() * 3);
  return placeTypes[randomNumber];
};

for (var i = 0; i < advCount; i++) {
  advertisements[i] = {
    "author": {
      "avatar": 'img/avatars/user0' + (i + 1) + '.png'
    },
    "offer": {
      "title": offerTitles[i],
      "address": 'location.x, y',
      "price": randomPrice(),
      "type": randomType(),
      "rooms": 'от 1 до 5',
      "guests": 'случайное количество гостей, которое можно разместить',
      "checkin": '12:00',
      "checkout": '12:00',
      "features": 'массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"',
      "description": '',
      "photos": []
    },
    "location": {
      "x": randomLocationX(300, 900),
      "y": randomLocationY(100, 500)
    }
  };

  console.log(advertisements[i].author.avatar);
  console.log(advertisements[i].offer.title);
  console.log(advertisements[i].offer.address);
  console.log(advertisements[i].offer.price);
  console.log(advertisements[i].offer.type);
  console.log(advertisements[i].location.x);
  console.log(advertisements[i].location.y);
}
