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

  var typesArr = ['bungalo', 'flat', 'house', 'palace'];
  var priceArr = [0, 1000, 5000, 10000];
  var checkInTimeArr = ['12:00', '13:00', '14:00'];
  var checkOutTimeArr = ['12:00', '13:00', '14:00'];

  inputAddress.value = 'x: 0, y: 0';

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
    selectTimeIn.value = '12:00';
    selectTimeOut.value = '12:00';
    selectTypeHouse.value = 'flat';
    inputPrice.value = '1000';
    selectRoomNumber.value = '1';
    selectCapacity.value = '1';
    inputTitle.value = '';
    inputAddress.value = 'x: 0, y: 0';
    alert('Форма успешно отправлена');
  };

  selectTimeIn.addEventListener('change', function () {
    window.synchronizeFields(selectTimeIn, selectTimeOut, checkInTimeArr, checkOutTimeArr, syncValues);
  });

  selectTimeOut.addEventListener('change', function () {
    window.synchronizeFields(selectTimeOut, selectTimeIn, checkOutTimeArr, checkInTimeArr, syncValues);
  });

  selectTypeHouse.addEventListener('change', function () {
    window.synchronizeFields(selectTypeHouse, inputPrice, typesArr, priceArr, syncValueWithType);
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

  noticeForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(noticeForm), function (response) {
      getAfterLoadCondition();
    }, function (message) {
      alert(message);
    });
    evt.preventDefault();
  });

  window.form = {
    inputAddress: inputAddress,
    getDisabledForm: getDisabledForm,
    getEnabledForm: getEnabledForm
  };
})();
