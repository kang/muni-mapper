// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import muniActions from '../actions/muniActions';
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
  }

  componentDidMount() {
    this.props.fetchMuni();

    this.muniFetcher = window.setInterval(() => {
      this.props.fetchMuni(this.props.muni.lastTime);
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.muniFetcher);
  }

  render() {
    console.log(this.props.muni.vehicles.length);
    return (
      <div className="MuniMapper">
        somehow render the map and draw buses on it
        {this.props.muni.vehicles.map(vehicle => (
          <div key={vehicle.id}>{vehicle.id}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ muni: state.muni });

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchMuni: muniActions.fetchMuni
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MuniMapper);
