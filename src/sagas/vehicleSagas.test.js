import sinon from 'sinon';
import { runSaga } from 'redux-saga';
import { composeUrl, getVehicles, saga } from './vehicleSagas';
import api from '../services';

describe('vehicleSagas', () => {
  describe('composeUrl - helper function', () => {
    it('should have url with a time of 0 if no lastTime was supplied', () => {
      const url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0';
      expect(composeUrl()).toBe(url);
    });

    it('should have url with a time of lastTime', () => {
      const url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=123';
      expect(composeUrl(123)).toBe(url);
    });
  });

  describe('getVehicles', () => {
    it('should dispatch a success action when api call is successful', () => {
      const dispatched = [];
      const mockData = {
        vehicle: [1, 2, 3],
        lastTime: 456
      };

      sinon.stub(api, 'getVehicles').callsFake(() => mockData);

      const result = runSaga({
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: 'test' }),
      }, getVehicles, { lastTime: mockData.lastTime }).done;

      expect(api.getVehicles.called).toBe(true);
      expect(dispatched).toEqual([ { type: 'VEHICLES_FETCH_SUCCESS',
        vehicles: mockData.vehicle,
        lastTime: mockData.lastTime } ]);
    });

    it('should dispatch a success action when api call is successful', () => {
      const dispatched = [];
      const mockData = {
        vehicle: [1, 2, 3],
        lastTime: 456
      };

      api.getVehicles.restore();
      sinon.stub(api, 'getVehicles').throws(() => ({ error: 'test error' }));

      const result = runSaga({
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: 'test' }),
      }, getVehicles, { lastTime: mockData.lastTime }).done;

      expect(api.getVehicles.called).toBe(true);
      expect(dispatched).toEqual([{"error": "test error", "type": "VEHICLES_FETCH_FAILURE"}]);
    });
  });
});
