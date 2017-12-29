'use strict';

(function () {
  var PINS_QUANTITY = 5;
  var mapPins = window.utils.mapBlock.querySelector('.map__pins');

  var filtersForm = document.querySelector('.map__filters');
  var filtersHouseType = filtersForm.querySelector('#housing-type');
  var filtersHousePrice = filtersForm.querySelector('#housing-price');
  var filtersHouseRooms = filtersForm.querySelector('#housing-rooms');
  var filtersHouseGuests = filtersForm.querySelector('#housing-guests');
  var filtersHouseFeatures = filtersForm.querySelector('#housing-features');
  
  var renderMapPins = function (advertisement) {
    var fragment = document.createDocumentFragment();
    var mapPinWidth = 40;
    var mapPinHeight = 62;
    for (var i = 0; i < PINS_QUANTITY; i++) {
      var mapPin = document.createElement('button');

      mapPin.className = 'map__pin';
      mapPin.style.left = advertisement[i].location.x - mapPinWidth / 2 + 'px';
      mapPin.style.top = advertisement[i].location.y + mapPinHeight + 'px';
      mapPin.innerHTML = '<img src="' + advertisement[i].author.avatar + '" width="40" height="40" draggable="false">';
      mapPin.dataset.adIndex = i;

      fragment.appendChild(mapPin);
    }

    return fragment;
  };

  var getEnabledPins = function () {
    var renderedMapPins = renderMapPins(window.data.advertisements);
    mapPins.appendChild(renderedMapPins);
  };

  window.pin = {
    mapPins: mapPins,
    getEnabledPins: getEnabledPins
  };
})();
