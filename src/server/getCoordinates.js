const axios = require("axios");

const getCoordinates = (username, city) => {
  const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
  
  return axios.get(url)
    .then(response => {
      if (response.data.geonames?.length > 0) {
        const { lat, lng } = response.data.geonames[0];
        return { lat, lng };
      } else {
        console.log("No coordinates data found.");
        return {};
      }
    })
    .catch(error => {
      console.error("Error fetching coordinates:", error);
      return {};
    });
};

module.exports = getCoordinates;