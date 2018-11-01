var filterType = function (pin) {

  if (housingTypeSelectElement.value === "palace") {
    return pin.type.price === "palace";
  } else if (housingTypeSelectElement.value === "house") {
    return pin.type.price === 'house';
  } else if (housingTypeSelectElement.value === "flat") {
    return pin.type.price === "flat";
  } else if (housingTypeSelectElement.value === "bungalo") {
    return pin.type.price === "bungalo";
  } else {
    return true;
  }

};


var FilterAll = function (elements) {
  return elements.filter(filterType);
  console.log(elements.filter(filterType));
  console.log('aaaaaaaaaaaaaaaaaa');
};
