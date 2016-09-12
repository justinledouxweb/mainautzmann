var version = require( './package.json' ).version

module.exports = {
	local: {
		baseURL: 								'http://localhost:' + process.env.PORT + '/',
		staticResourcesBaseURL: '/',
		staticResourceCache: 		{ maxage: 0, etag: false },
	},

	staging: {
		baseURL: 								'http://mainautzmann.heroku.com/',
		staticResourcesBaseURL: '/',
		staticResourceCache: 		{ maxage: 0, etag: false },
	},

	production: {
		baseURL: 								'http://mainautzmann.heroku.com/',
		staticResourcesBaseURL: '/',
		staticResourceCache: 		{ maxage: 0, etag: false },
	}
}