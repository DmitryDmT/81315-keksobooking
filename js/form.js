'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var selectTimeIn = noticeForm.querySelector('#timein');
  var selectTimeOut = noticeForm.querySelector('#timeout');
  var selectTypeHouse = noticeForm.querySelector('#type');
  var inputPrice = noticeForm.querySelector('#price');
  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var selectCapacity = noticeForm.querySelector('#capacity');
  var inputTitle = noticeForm.querySelector('#title');
  var inputAddress = noticeForm.querySelector('#address');

  var getDisabledForm = function () {
    for (var i = 0; i < noticeFormFieldsets.length; i++) {
      noticeFormFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var getEnabledForm = function () {
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < noticeFormFieldsets.length; i++) {
      noticeFormFieldsets[i].removeAttribute('disabled');
    }
  };

  var getAssociatedTimeInOut = function (optionFirst, optionSecond) {
    var change = optionFirst.value;
    optionSecond.value = change;
  };

  var getAssociatedTypeHouse = function (type, price) {
    if (type.value === 'bungalo') {
      price.min = 0;
    } else if (type.value === 'flat') {
      price.min = 1000;
    } else if (type.value === 'house') {
      price.min = 5000;
    } else if (type.value === 'palace') {
      price.min = 10000;
    }
  };

  var getAssociatedRoomsGuests = function (rooms, guests) {
    for (var i = 0; i < guests.options.length; i++) {
      guests.options[i].disabled = true;
    }

    var roomsObj = {
      1: [2],
      2: [1, 2],
      3: [0, 1, 2],
      100: [3]
    };

    roomsObj[rooms.value].forEach(function (num) {
      guests.options[num].disabled = false;
      for (var key in roomsObj) {
        guests.value = rooms.value;
        if (rooms.value === '100') {
          guests.value = '0';
        }
      }
    });
  };

  selectTimeIn.addEventListener('change', function () {
    getAssociatedTimeInOut(selectTimeIn, selectTimeOut);
  });

  selectTimeOut.addEventListener('change', function () {
    getAssociatedTimeInOut(selectTimeOut, selectTimeIn);
  });

  selectTypeHouse.addEventListener('change', function () {
    getAssociatedTypeHouse(selectTypeHouse, inputPrice);
  });

  selectRoomNumber.addEventListener('change', function () {
    getAssociatedRoomsGuests(selectRoomNumber, selectCapacity);
  });

  inputTitle.addEventListener('invalid', function () {
    inputTitle.style.borderColor = 'red';
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок должен содержать минимум 30 символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок должен содержать максимум 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  inputAddress.addEventListener('invalid', function () {
    inputAddress.style.borderColor = 'red';
    if (inputAddress.validity.valueMissing) {
      inputAddress.setCustomValidity('Обязательное поле');
    } else {
      inputAddress.setCustomValidity('');
    }
  });

  inputPrice.addEventListener('invalid', function () {
    inputPrice.style.borderColor = 'red';
    if (inputPrice.validity.tooShort) {
      inputPrice.setCustomValidity('Цена устанавливается с 0');
    } else if (inputPrice.validity.tooLong) {
      inputPrice.setCustomValidity('Максимальная цена - 1 000 000');
    } else if (inputTitle.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
    }
  });

  window.form = {
    inputAddress: inputAddress,
    getDisabledForm: getDisabledForm,
    getEnabledForm: getEnabledForm
  };
})();
