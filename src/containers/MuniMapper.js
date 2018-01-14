// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import muniActions from '../actions/muniActions';
import Map from '../components/Map';
import Vehicles from '../components/Vehicles';
import './MuniMapper.css';

type Props = {
  fetchMuni: () => void,
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

class MuniMapper extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = { filter: '' };

    this.renderRouteSelector = this.renderRouteSelector.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchMuni();

    // this.muniFetcher = window.setInterval(() => {
    //   this.props.fetchMuni(this.props.muni.lastTime);
    // }, 15000);
  }

  componentWillUnmount() {
    // clearInterval(this.muniFetcher);
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

    return (
      <div className="MuniMapper">
        <Map />
        <Vehicles vehicles={filteredVehicles} />
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
      <label className="MuniMapper-filter-selector">
        Filter by route:
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

const mapStateToProps = state => ({ muni: state.muni });

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchMuni: muniActions.fetchMuni
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MuniMapper);
