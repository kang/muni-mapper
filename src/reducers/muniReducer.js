import initialState from './initialState';
import { MUNI_FETCH_REQUEST, MUNI_FETCH_RECEIVE } from '../actions/actionTypes';

const muni = (state = initialState, action) => {
  switch (action.type) {
    case MUNI_FETCH_REQUEST:
      return state;
    case MUNI_FETCH_RECEIVE:
      const oldVehicleMap = {};
      const updatedVehicles = [];

      // create old vehicle map to reduce lookup time and add old vehicles to the updated list
      state.vehicles.forEach((vehicle, i) => {
        oldVehicleMap[vehicle.id] = updatedVehicles.length;
        updatedVehicles.push(vehicle);
      });
      // replace old vehicles if it exists (using the map) or push onto the list
      action.vehicles.forEach(vehicle => {
        const index = oldVehicleMap[vehicle.id];
        const shouldUpdate = index >= 0;

        shouldUpdate ? updatedVehicles[index] = vehicle : updatedVehicles.push(vehicle);
      });

      return {
        vehicles: updatedVehicles,
        lastTime: action.lastTime
      };
    default:
      return state;
  }
}

export default muni;
