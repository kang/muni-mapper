import * as types from './actionTypes';
import 'whatwg-fetch';

// default time is 0 because api will treat that as 15 minutes prior
const composeUrl = (lastTime = 0) => (
  `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${lastTime}`
);

const fetchMuni = lastTime => (
  // TODO - rewrite with redux-saga
  dispatch => (
    fetch(composeUrl(lastTime))
      .then(response => response.json())
      .then(json => dispatch(receiveMuni(json)))
  )
);

const receiveMuni = json => ({
  type: types.RECEIVE_MUNI,
  vehicles: json.vehicle,
  lastTime: json.lastTime.time
});

export default {
  fetchMuni
};
