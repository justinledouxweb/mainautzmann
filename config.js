module.exports = {
  local: {
    baseURL: `http://localhost:${process.env.PORT || 3000}/`,
    staticResourcesBaseURL: '/',
    staticResourceCache: { maxage: 0, etag: false },
  },

  staging: {
    baseURL: 'https://mainautzmann.heroku.com/',
    staticResourcesBaseURL: '/',
    staticResourceCache: { maxage: 0, etag: false },
  },

  production: {
    baseURL: 'http://www.mainautzmann.com/',
    staticResourcesBaseURL: '/',
    staticResourceCache: { maxage: 365 * 24 * 60 * 60 * 1000, etag: true },
  },
};
