const API_URL = 'https://revasa.github.io/learnjs-catalog';
// const API_URL = 'http://localhost:3000';

const HttpService = {
  sendRequest(url) {
    return fetch(`${API_URL}/api/${url}`)
      .then(response => response.json());
  }
};

export default HttpService;
