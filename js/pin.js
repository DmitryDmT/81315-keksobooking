'use strict';

(function () {
  var PINS_QUANTITY = 5;
  var mapPins = window.utils.mapBlock.querySelector('.map__pins');
  var mapPinArray = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  var filtersForm = document.querySelector('.map__filters');
  var filtersHouseType = filtersForm.querySelector('#housing-type');
  var filtersHousePrice = filtersForm.querySelector('#housing-price');
  var filtersHouseRooms = filtersForm.querySelector('#housing-rooms');
  var filtersHouseGuests = filtersForm.querySelector('#housing-guests');
  var filtersHouseFeatures = filtersForm.querySelector('#housing-features');
  
  window.load(function (data) {
    window.advertisements = data;
  }, function (message) {
    alert(message);
  });

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
  
  var getHiddenPins = function () {
    mapPinArray.forEach(function (it) {
      it.classList.add('hidden');
    });
  };
  
  var getEnabledPins = function () {
    mapPins.appendChild(renderMapPins(window.advertisements));
  };
  
  var getFilteredPins = function () {
    var filteredPins = window.advertisements;
    
    var getFilteredTypes = function (value, type) {
      if (value !== 'any') {
        filteredPins = filteredPins.filter(function (it) {
          return it.offer[type] === value;
        });
      }
      
      return filteredPins;
    };
    
    
    getFilteredTypes(filtersHouseType.value, 'type');
  };
  
  filtersForm.addEventListener('change', function () {
    getFilteredPins();
  });

  window.pin = {
    mapPins: mapPins,
    getEnabledPins: getEnabledPins
  };
})();
