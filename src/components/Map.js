// @flow
import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import sfmaps from '../assets/sfmaps';
import './Map.css';

const size = { width: 960, height: 600 };

const projection = geoMercator()
  .scale(190000)
  .center([-122.44, 37.7685])
  .translate([size.width / 2 - 60, size.height / 2]);

const getPath = () => (
  geoPath().projection(projection)
);

const drawLayers = (layers, g) => {
  layers.forEach(layerName => {
    const layer = g.append('g');
    const features = sfmaps[layerName].features;

    layer.selectAll('path')
      .data(features)
      .enter().append('path')
      .attr('class', layerName)
      .attr('d', getPath())
      .attr('vector-effect', 'non-scaling-stroke');
  });
};

class Map extends Component {
  shouldComponentUpdate() {
    return this.initializedMap ? false : this.initializedMap = true;
  }

  render() {
    select(this.node).append('rect')
      .attr('class', 'background')
      .attr('width', size.width)
      .attr('height', size.height);

    const g = select(this.node).append('g');
    drawLayers(['neighborhood', 'street', 'freeway', 'artery'], g);

    return (
      <svg ref={node => this.node = node}
      width={size.width} height={size.height}>
      </svg>
    );
  }
};

export default Map;
