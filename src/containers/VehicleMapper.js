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

    this.renderRouteSelector = this.renderRouteSelector.bind(this);
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
    let filteredVehicles = this.props.muni.vehicles;

    if (this.state.filter) {
      filteredVehicles = this.props.muni.vehicles.filter(vehicle => (
        vehicle.routeTag === this.state.filter
      ));
    }

    const size = { width: 960, height: 600 };

    return (
      <div className="VehicleMapper">
        <MapLayer size={size} />
        <VehicleLayer vehicles={filteredVehicles} size={size} />
        {this.renderRouteSelector()}
      </div>
    );
  }

  renderRouteSelector() {
    const routeSet = new Set();
    this.props.muni.vehicles.forEach(vehicle => {
      routeSet.add(vehicle.routeTag);
    });
    const routeList = Array.from(routeSet);

    return (
      <label className="VehicleMapper-filter-selector">
        Filter by route: &nbsp;
        <select value={this.state.filter} onChange={this.handleFilterChange}>
          <option value=''>All</option>
          {routeList.map(route => (
            <option key={route} value={route}>{route}</option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = state => ({ muni: state.vehicle });

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchVehicles
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMapper);
