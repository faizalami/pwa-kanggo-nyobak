export default {
  baseUrl: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  _mergeConfig (config) {
    return {
      ...config,
      headers: {
        ...this.headers,
        ...config.headers,
      },
    };
  },
  request (url, config) {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseUrl}${url}`, { ...this._mergeConfig(config) })
        .then(response => resolve(response.json()))
        .catch(error => reject(error));
    });
  },
  get (url, config) {
    return this.request(url, {
      config,
      method: 'GET',
    });
  },
  post (url, config) {
    return this.request(url, {
      config,
      method: 'POST',
    });
  },
};
