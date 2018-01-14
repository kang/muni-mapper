// @flow
import React from 'react';
import { geoMercator } from 'd3-geo';
import { select } from 'd3-selection';
import './Vehicles.css';

type Props = {
  vehicles: Array<{
    lat: string,
    lon: string,
    routeTag: string,
    secsSinceReport: string,
  }>
};

const size = { width: 960, height: 600 };

const projection = geoMercator()
  .scale(190000)
  .center([-122.44, 37.7685])
  .translate([size.width / 2 - 60, size.height / 2]);

// const getPath = () => (
//   geoPath().projection(projection)
// );

const drawCars = (vehicles, g) => {
  g.selectAll("circle")
    .data(vehicles)
    .enter()
    .append("circle")
    .attr("cx", (d) => (
      projection([d.lon, d.lat])[0]
    ))
    .attr("cy", (d) => (
      projection([d.lon, d.lat])[1]
    ))
    .attr("r", 4)
};

const Vehicles = ({ vehicles }: Props) => {
  const g = select(this.node).append('g');
  drawCars(vehicles, g);

  return (
    <svg className="vehicle-svg" ref={node => this.node = node}
    width={size.width} height={size.height}>
    </svg>
  );
};

export default Vehicles;
