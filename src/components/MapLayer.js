// @flow
import React, { PureComponent } from 'react';
import { select } from 'd3-selection';
import { getPath, getProjection } from '../d3Helper';
import sfmaps from '../assets/sfmaps';
import './MapLayer.css';

const drawLayers = (layers, g, size) => {
  const path = getPath(getProjection(size));

  layers.forEach(layerName => {
    const layer = g.append('g');
    const features = sfmaps[layerName].features;

    layer.selectAll('path')
      .data(features)
      .enter().append('path')
      .attr('class', layerName)
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke');
  });
};

type Props = {
  size: {
    height: number,
    width: number
  }
};

class MapLayer extends PureComponent<Props> {
  componentDidMount() {
    const size = this.props.size;

    select(this.node).append('rect')
      .attr('class', 'background')
      .attr('width', size.width)
      .attr('height', size.height);

    const g = select(this.node).append('g');
    drawLayers(['neighborhood', 'street', 'freeway', 'artery'], g, size);
  }

  render() {
    const { height, width } = this.props.size;
    return (
      <svg ref={node => this.node = node} width={width} height={height} />
    );
  }
};

export default MapLayer;
