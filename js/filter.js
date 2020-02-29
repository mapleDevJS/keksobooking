'use strict';

(function () {
  var filterNode = document.querySelector('.map__filters');
  var selects = filterNode.querySelectorAll('.map__filter');
  var typeNode = filterNode.querySelector('#housing-type');
  var priceNode = filterNode.querySelector('#housing-price');
  var roomsNode = filterNode.querySelector('#housing-rooms');
  var guestsNode = filterNode.querySelector('#housing-guests');

  var disable = function () {
    filterNode.reset();
    filterNode.setAttribute('disabled', 'disabled');
    filterNode.removeEventListener('change', onFiltersChange);
  };

  var activate = function () {
    filterNode.removeAttribute('disabled');

    var activateSelect = function (select) {
      select.removeAttribute('disabled');
    };

    selects.forEach(activateSelect);
    filterNode.addEventListener('change', window.debounce(onFiltersChange));
  };

  var filterValues = {
    type: typeNode.value,
    price: priceNode.value,
    rooms: roomsNode.value,
    guests: guestsNode.value,
    features: Array.from(filterNode.querySelectorAll('input:checked')).map(function (advert) {
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
    return filterValues.features.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  };

  var onFiltersChange = function (evt) {

    if (evt.target.id === typeNode.id) {
      filterValues.type = evt.target.value;
    } else if (evt.target.id === priceNode.id) {
      filterValues.price = evt.target.value;
    } else if (evt.target.id === roomsNode.id) {
      filterValues.rooms = evt.target.value;
    } else if (evt.target.id === guestsNode.id) {
      filterValues.guests = evt.target.value;
    } else if (evt.target.id === ('filter-' + evt.target.value)) {
      filterValues.features = Array.from(filterNode.querySelectorAll('input:checked')).map(function (advert) {
        return advert.value;
      });
    }

    var filterOffers = function (ad) {
      return filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByFeatures(ad);
    };

    var filteredOffers = window.offers.filter(filterOffers);
    window.pin.update(filteredOffers);

  };

  window.filter = {
    disable: disable,
    activate: activate
  };
})();
