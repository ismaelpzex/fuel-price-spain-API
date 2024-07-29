const axios = require("axios");

/**
 * Fetches data from the given URL using an HTTP GET request.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the data fetched from the API.
 * @throws {Error} - Throws an error if there is an issue fetching data from the API.
 */

module.exports = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from API: ${error.message}`);
  }
};
