// @flow
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchVehicles } from '../actions/vehicleActions';
import MapLayer from '../components/MapLayer';
import VehicleLayer from '../components/VehicleLayer';
import './VehicleMapper.css';

type Props = {
  fetchVehicles: () => void,
  muni: {
    vehicles: Array<{
      lat: string,
      lon: string,
      routeTag: string,
      secsSinceReport: string,
    }>,
    lastTime: string
  }
};

type State = {
  filter: string
};

class VehicleMapper extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = { filter: '' };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchVehicles();

    this.muniFetcher = window.setInterval(() => {
      this.props.fetchVehicles(this.props.muni.lastTime);
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.muniFetcher);
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    const size = { width: 960, height: 600 };
    const filter = this.state.filter;
    const vehicles = this.props.muni.vehicles;
    const filteredVehicles = filter ? vehicles.filter(vehicle => vehicle.routeTag === filter) : vehicles;

    const routeSet = new Set();
    vehicles.forEach(vehicle => {
      routeSet.add(vehicle.routeTag);
    });
    const routeList = Array.from(routeSet);

    return (
      <div className="VehicleMapper">
        <MapLayer size={size} />
        <VehicleLayer vehicles={filteredVehicles} size={size} />

        <label className="VehicleMapper-filter-selector">
          Filter by route: &nbsp;
          <select value={this.state.filter} onChange={this.handleFilterChange}>
            <option value=''>All</option>
            {routeList.map(route => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({ muni: state.vehicle });
const mapDispatchToProps = dispatch => (bindActionCreators({ fetchVehicles }, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(VehicleMapper);
