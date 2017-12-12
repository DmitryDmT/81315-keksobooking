'use strict';

(function () {
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

  var getFeatures = function () {
    var offerFeatures = [];

    for (var featuresIndex = 0; featuresIndex < 1 + Math.floor(Math.random() * fixedOfferFeatures.length); featuresIndex++) {
      offerFeatures.push(fixedOfferFeatures[featuresIndex]);
    }

    return offerFeatures;
  };

  var advertisements = [];

  var renderAdvertisements = function () {
    for (var i = 0; i < advCount; i++) {
      var locationX = window.utils.getRandomNumber(300, 900);
      var locationY = window.utils.getRandomNumber(100, 500);
      advertisements[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + window.utils.getUniqueRandomElement(userAvatars) + '.png'
        },
        'offer': {
          'title': window.utils.getUniqueRandomElement(fixedOfferTitles),
          'address': locationX + ', ' + locationY,
          'price': window.utils.getRandomNumber(1000, 999000),
          'type': window.utils.getRandomElement(placeTypes),
          'rooms': window.utils.getRandomNumber(1, 5),
          'guests': window.utils.getRandomNumber(1, 10),
          'checkin': window.utils.getRandomElement(checkInTimeMarks),
          'checkout': window.utils.getRandomElement(checkOutTimeMarks),
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

  window.data = {
    advertisements: advertisements
  };
})();
