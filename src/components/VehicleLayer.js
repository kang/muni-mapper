// @flow
import React, { PureComponent } from 'react';
import Vehicle from './Vehicle';

import './VehicleLayer.css';

type Props = {
  size: {
    height: number,
    width: number
  },
  vehicles: Array<{
    lat: string,
    lon: string,
    routeTag: string,
    secsSinceReport: string,
  }>
};

class VehicleLayer extends PureComponent<Props> {
  render() {
    const size = this.props.size;
    return (
      <svg className="vehicles-svg" width={size.width} height={size.height}
        ref={ref => (this._svgRef = ref)}
      >
        {this.props.vehicles.map(({ id, lat, lon }) => (
          <Vehicle key={id} lat={lat} lon={lon} size={size} svgRef={this._svgRef} />
        ))}
      </svg>
    );
  }
};

export default VehicleLayer;
