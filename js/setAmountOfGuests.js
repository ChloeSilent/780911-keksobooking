/* устанавливает кол-во гостей от кол-ва комнат*/

var setAmountOfGuests = function () {
  var selectedOptionRoom = amountRoomsSelect.options[amountRoomsSelect.selectedIndex];
  amountGuestsSelect.value = selectedOptionRoom.value === '100' ? 0 : selectedOptionRoom.value;
  allOptionGuests.forEach(function (node) {

    node.setAttribute('disabled', node.value === '100' ? 0 : (selectedOptionRoom.value < node.value));
  });

};
/* устанавливает кол-во гостей от кол-ва комнат*/
var setAmountOfGuests = function () {
  if (amountRoomsSelect.value === '1') {
    amountGuestsSelect.value = 1;
    allOptionGuests.forEach(function (node) {
      node.setAttribute('disabled', true);
    });
    allOptionGuests[2].removeAttribute('disabled');
  } else if (amountRoomsSelect.value === '2') {
    amountGuestsSelect.value = 2;
    allOptionGuests.forEach(function (node) {
      node.setAttribute('disabled', true);
    });
    allOptionGuests[1].removeAttribute('disabled');
    allOptionGuests[2].removeAttribute('disabled');
  } else if (amountRoomsSelect.value === '3') {
    amountGuestsSelect.value = 3;
    allOptionGuests.forEach(function (node) {
      node.setAttribute('disabled', true);
    });
    allOptionGuests[0].removeAttribute('disabled');
    allOptionGuests[1].removeAttribute('disabled');
    allOptionGuests[2].removeAttribute('disabled');
  } else if (amountRoomsSelect.value === '100') {
    amountGuestsSelect.value = 0;
    allOptionGuests.forEach(function (node) {
      node.setAttribute('disabled', true);
      allOptionGuests[3].removeAttribute('disabled');
    });
  }

};
