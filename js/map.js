'use strict';

var advertisements = [];
var advCount = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeTypes = ['flat', 'house', 'bungalo'];

var randomLocationCoordinates = function (start, end) {
  var coordinates = [];

  for (var i = start; i <= end; i++) {
    coordinates.push(i);
  }

  var result = coordinates.splice(Math.floor(Math.random() * coordinates.length), 1)[0];

  return result;
};

var randomPrice = function (priceStart, priceEnd) {
  var randomNumber = Math.floor(priceStart + Math.random() * priceEnd);
  return randomNumber;
};

var randomType = function () {
  var randomNumber = Math.floor(Math.random() * placeTypes.length);
  return placeTypes[randomNumber];
};

var randomCount = function (minCount, maxCount) {
  var randomNumber = Math.floor(minCount + Math.random() * maxCount);
  return randomNumber;
};

for (var i = 0; i < advCount; i++) {
  advertisements[i] = {
    "author": {
      "avatar": 'img/avatars/user0' + (i + 1) + '.png'
    },
    "offer": {
      "title": offerTitles[i],
      "address": 'location.x, y',
      "price": 'Цена - ' + randomPrice(1000, 1000000),
      "type": 'Тип помещения - ' + randomType(),
      "rooms": 'Количество комнат - ' + randomCount(1, 5),
      "guests": 'Количество гостей - ' + randomCount(1, 10),
      "checkin": '12:00',
      "checkout": '12:00',
      "features": 'массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"',
      "description": '',
      "photos": []
    },
    "location": {
      "x": 'Координата x - ' + randomLocationCoordinates(300, 900),
      "y": 'Координата y - ' + randomLocationCoordinates(100, 500)
    }
  };
}

console.log(advertisements[0].author.avatar);
console.log(advertisements[0].offer.title);
console.log(advertisements[0].offer.address);
console.log(advertisements[0].offer.price);
console.log(advertisements[0].offer.type);
console.log(advertisements[0].offer.rooms);
console.log(advertisements[0].offer.guests);
console.log(advertisements[0].location.x);
console.log(advertisements[0].location.y);
