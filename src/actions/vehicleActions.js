export const VEHICLES_FETCH_REQUEST = 'VEHICLES_FETCH_REQUEST';
export const VEHICLES_FETCH_SUCCESS = 'VEHICLES_FETCH_SUCCESS';
export const VEHICLES_FETCH_FAILURE = 'VEHICLES_FETCH_FAILURE';

export const fetchVehicles = lastTime => ({
  type: VEHICLES_FETCH_REQUEST,
  lastTime
});

export const fetchVehiclesSuccess = ({ vehicle, lastTime }) => ({
  type: VEHICLES_FETCH_SUCCESS,
  vehicles: vehicle,
  lastTime
});

export const fetchVehiclesFailure = ({ error }) => ({
  type: VEHICLES_FETCH_FAILURE,
  error
});
