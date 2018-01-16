import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/vehicleActions';
import api from '../services';

export const composeUrl = (lastTime = 0) => (
  `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${lastTime}`
);

export function* getVehicles({ lastTime }) {
    try {
      const vehicles = yield call(api.getVehicles, composeUrl(lastTime));
      yield put(actions.fetchVehiclesSuccess(vehicles));
    } catch(error) {
      yield put(actions.fetchVehiclesFailure(error));
    }
}

export default function* saga() {
  yield takeEvery(actions.VEHICLES_FETCH_REQUEST, getVehicles);
}
