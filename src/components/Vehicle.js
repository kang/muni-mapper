// @flow
import { PureComponent } from 'react';
import { select } from 'd3-selection';
import 'd3-transition';
import { getProjection } from '../d3Helper';

type Props = {
  lat: string,
  lon: string,
  size: {
    height: number,
    width: number
  },
  svgRef: any
};

class Vehicle extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.setLocation = this.setLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    this.setLocation();
  }

  componentWillUnmount() {
    this.g.selectAll('circle').style('opacity', 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lat !== this.props.lat || prevProps.lon !== this.props.lon) {
      this.updateLocation();
    }
  }

  render() {
    return null;
  }

  setLocation(initialCall) {
    const { lat, lon, size, svgRef } = this.props;
    const projection = getProjection(size);

    this.g = select(svgRef).append('g');
    this.g.selectAll('circle')
      .data([{ lat, lon }]).enter()
      .append('circle')
      .attr('cx', projection([lon, lat])[0])
      .attr('cy', projection([lon, lat])[1])
      .attr('r', '4px');
  }

  updateLocation() {
    const { lat, lon, size } = this.props;
    const projection = getProjection(size);

    this.g.selectAll('circle')
      .transition()
        .attr('cx', projection([lon, lat])[0])
        .attr('cy', projection([lon, lat])[1])
        .duration(500);
  }
};

export default Vehicle;
