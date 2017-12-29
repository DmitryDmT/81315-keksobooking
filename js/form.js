'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var noticeSelectTimeIn = noticeForm.querySelector('#timein');
  var noticeSelectTimeOut = noticeForm.querySelector('#timeout');
  var noticeSelectTypeHouse = noticeForm.querySelector('#type');
  var noticeInputPrice = noticeForm.querySelector('#price');
  var noticeSelectRoomNumber = noticeForm.querySelector('#room_number');
  var noticeSelectCapacity = noticeForm.querySelector('#capacity');
  var noticeInputTitle = noticeForm.querySelector('#title');
  var noticeInputAddress = noticeForm.querySelector('#address');

  var typesArr = ['bungalo', 'flat', 'house', 'palace'];
  var priceArr = [0, 1000, 5000, 10000];
  var checkInTimeArr = ['12:00', '13:00', '14:00'];
  var checkOutTimeArr = ['12:00', '13:00', '14:00'];

  noticeInputAddress.value = 'x: 0, y: 0';

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithType = function (element, value) {
    element.min = value;
  };

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
    });

    guests.value = rooms.value;
    if (rooms.value === '100') {
      guests.value = '0';
    }
  };

  var getAfterLoadCondition = function () {
    noticeSelectTimeIn.value = '12:00';
    noticeSelectTimeOut.value = '12:00';
    noticeSelectTypeHouse.value = 'flat';
    noticeInputPrice.value = '1000';
    noticeSelectRoomNumber.value = '1';
    noticeSelectCapacity.value = '1';
    noticeInputTitle.value = '';
    noticeInputAddress.value = 'x: 0, y: 0';
    alert('Форма успешно отправлена');
  };

  noticeSelectTimeIn.addEventListener('change', function () {
    window.synchronizeFields(noticeSelectTimeIn, noticeSelectTimeOut, checkInTimeArr, checkOutTimeArr, syncValues);
  });

  noticeSelectTimeOut.addEventListener('change', function () {
    window.synchronizeFields(noticeSelectTimeOut, noticeSelectTimeIn, checkOutTimeArr, checkInTimeArr, syncValues);
  });

  noticeSelectTypeHouse.addEventListener('change', function () {
    window.synchronizeFields(noticeSelectTypeHouse, noticeInputPrice, typesArr, priceArr, syncValueWithType);
  });

  noticeSelectRoomNumber.addEventListener('change', function () {
    getAssociatedRoomsGuests(noticeSelectRoomNumber, noticeSelectCapacity);
  });

  noticeInputTitle.addEventListener('invalid', function () {
    noticeInputTitle.style.borderColor = 'red';
    if (noticeInputTitle.validity.tooShort) {
      noticeInputTitle.setCustomValidity('Заголовок должен содержать минимум 30 символов');
    } else if (noticeInputTitle.validity.tooLong) {
      noticeInputTitle.setCustomValidity('Заголовок должен содержать максимум 100 символов');
    } else if (noticeInputTitle.validity.valueMissing) {
      noticeInputTitle.setCustomValidity('Обязательное поле');
    } else {
      noticeInputTitle.setCustomValidity('');
    }
  });

  noticeInputAddress.addEventListener('invalid', function () {
    noticeInputAddress.style.borderColor = 'red';
    if (noticeInputAddress.validity.valueMissing) {
      noticeInputAddress.setCustomValidity('Обязательное поле');
    } else {
      noticeInputAddress.setCustomValidity('');
    }
  });

  noticeInputPrice.addEventListener('invalid', function () {
    noticeInputPrice.style.borderColor = 'red';
    if (noticeInputPrice.validity.tooShort) {
      noticeInputPrice.setCustomValidity('Цена устанавливается с 0');
    } else if (noticeInputPrice.validity.tooLong) {
      noticeInputPrice.setCustomValidity('Максимальная цена - 1 000 000');
    } else if (noticeInputPrice.validity.valueMissing) {
      noticeInputPrice.setCustomValidity('Обязательное поле');
    } else {
      noticeInputPrice.setCustomValidity('');
    }
  });

  noticeForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(noticeForm), function (response) {
      getAfterLoadCondition();
    }, function (message) {
      alert(message);
    });
    evt.preventDefault();
  });

  window.form = {
    noticeInputAddress: noticeInputAddress,
    getDisabledForm: getDisabledForm,
    getEnabledForm: getEnabledForm
  };
})();
