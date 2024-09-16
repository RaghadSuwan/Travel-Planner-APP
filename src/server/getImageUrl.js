const axios = require("axios");

const getImageUrl = (apiKey, query) => {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}`;
  
  return axios.get(url)
    .then(response => {
      if (response.data.totalHits > 0) {
        return response.data.hits[0].largeImageURL;
      } else {
        return "https://i.ibb.co/PwKhD7c/not-found-2384304-1280.jpg"; // صورة افتراضية في حالة عدم العثور على نتائج
      }
    })
    .catch(error => {
      console.error("Failed to fetch image from Pixabay:", error);
      return "https://i.ibb.co/PwKhD7c/not-found-2384304-1280.jpg";
    });
};

module.exports = getImageUrl;
