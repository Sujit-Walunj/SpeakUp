// apiConnector.js
import axios from 'axios';

const apiConnector = (method, url, options = {}) => {
  return axios({
    method,
    url,
    ...options, // Includes headers
  });
};

export default apiConnector;
