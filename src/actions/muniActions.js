import * as types from './actionTypes';
import 'whatwg-fetch';

// default time is 0 because api will treat that as 15 minutes prior
const composeUrl = (lastTime = 0) => (
  `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${lastTime}`
);

const fetchMuni = lastTime => (
  dispatch => {
    dispatch({ type: types.MUNI_FETCH_REQUEST, lastTime });
    
    return fetch(composeUrl(lastTime))
      .then(response => response.json())
      .then(json => dispatch(receiveMuni(json)));
  }
);

const receiveMuni = json => ({
  type: types.MUNI_FETCH_RECEIVE,
  vehicles: json.vehicle,
  lastTime: json.lastTime.time
});

export default {
  fetchMuni
};
