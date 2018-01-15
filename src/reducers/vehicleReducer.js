import initialState from './initialState';
import { VEHICLES_FETCH_REQUEST, VEHICLES_FETCH_SUCCESS } from '../actions/vehicleActions';

const vehicle = (state = initialState, action) => {
  switch (action.type) {
    case VEHICLES_FETCH_REQUEST:
      return state;
    case VEHICLES_FETCH_SUCCESS:
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

export default vehicle;
