import 'whatwg-fetch';

const getVehicles = url => (
  fetch(url).then(response => response.json())
);

export default { 
  getVehicles
};
