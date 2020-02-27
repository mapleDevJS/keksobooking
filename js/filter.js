'use strict';

(function () {
  var filterElements = document.querySelector('.map__filters');
  var selects = filterElements.querySelectorAll('.map__filter');
  var typeElement = filterElements.querySelector('#housing-type');
  var priceElement = filterElements.querySelector('#housing-price');
  var roomsElement = filterElements.querySelector('#housing-rooms');
  var guestsElement = filterElements.querySelector('#housing-guests');
  // var featuresElement = filterElements.querySelector('#housing-features');

  var disableSelect = function (select) {
    select.setAttribute('disabled', 'disabled');
  };

  var disable = function () {
    filterElements.setAttribute('disabled', 'disabled');
    selects.forEach(disableSelect);
    filterElements.removeEventListener('change', onFiltersChange);
  };

  var activate = function () {
    filterElements.removeAttribute('disabled');

    var activateSelect = function (select) {
      select.removeAttribute('disabled');
    };

    selects.forEach(activateSelect);
    filterElements.addEventListener('change', onFiltersChange);
  };

  var filterValues = {
    type: typeElement.value,
    price: priceElement.value,
    rooms: roomsElement.value,
    guests: guestsElement.value,
    features: Array.from(filterElements.querySelectorAll('input:checked')).map(function (advert) {
      return advert.value;
    })
  };

  var priceRange = {
    'low': {
      from: 0,
      to: 10000
    },
    'middle': {
      from: 10000,
      to: 50000
    },
    'high': {
      from: 50000,
      to: Infinity
    }
  };

  var filterByType = function (ad) {
    return (filterValues.type === 'any') ? true : (filterValues.type === ad.offer.type);
  };

  var filterByPrice = function (ad) {
    return (filterValues.price === 'any') ? true : (ad.offer.price >= priceRange[filterValues.price].from && ad.offer.price < priceRange[filterValues.price].to);
  };

  var filterByRooms = function (ad) {
    return (filterValues.rooms === 'any') ? true : (parseInt(filterValues.rooms, 10) === ad.offer.rooms);
  };

  var filterByGuests = function (ad) {
    return (filterValues.guests === 'any') ? true : (parseInt(filterValues.guests, 10) === ad.offer.guests);
  };

  var filterByFeatures = function (ad) {
    // console.log(filterValues.features + ' || ' + ad.offer.features);
    // console.log('--------------------------------------------------');
    return filterValues.features.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  };

  var onFiltersChange = function (evt) {

    if (evt.target.id === typeElement.id) {
      filterValues.type = evt.target.value;
    } else if (evt.target.id === priceElement.id) {
      filterValues.price = evt.target.value;
    } else if (evt.target.id === roomsElement.id) {
      filterValues.rooms = evt.target.value;
    } else if (evt.target.id === guestsElement.id) {
      filterValues.guests = evt.target.value;
    } else if (evt.target.id === ('filter-' + evt.target.value)) {
      filterValues.features = Array.from(filterElements.querySelectorAll('input:checked')).map(function (advert) {
        return advert.value;
      });
    }

    var filterOffers = function (ad) {
      return filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByFeatures(ad);
    };

    var filteredOffers = window.offers.filter(filterOffers);
    // console.log(filteredOffers);
    window.pin.update(filteredOffers);
  };
  window.filter = {
    disable: disable,
    activate: activate,
    filterValues: filterValues,
    filterByType: filterByType,
    filterByPrice: filterByPrice,
    filterByRooms: filterByRooms,
    filterByGuests: filterByGuests,
    filterByFeatures: filterByFeatures,
    onFiltersChange: onFiltersChange
  };
})();
