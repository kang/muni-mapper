import { geoMercator, geoPath } from 'd3-geo';

export const getProjection = size => (
  geoMercator()
    .scale(190000)
    .center([-122.44, 37.7685])
    .translate([size.width / 2 - 60, size.height / 2])
);

export const getPath = projection => (
  geoPath().projection(projection)
);

export default {
  getPath,
  getProjection
};
