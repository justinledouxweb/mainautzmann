/* eslint no-param-reassign: 0 */
'use strict';

require('newrelic');

const ENV = process.env.NODE_ENV;
const express = require('express');
const app = express();
const server = require('./server.js');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('./config.js')[ENV];
const formidable = require('formidable');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const handlebarsConfig = require('./handlebars-config.js');
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'fr'],
  cookie: 'i18n',
  directory: `${__dirname}/locales`,
  // updateFiles: false,
});

const hdb = handlebars.create(handlebarsConfig.handlebars);
app.engine('handlebars', hdb.engine);
app.set('view engine', 'handlebars');
app.set('view options', {
  layout: 'main.handlebars',
});

// App setup environment port
app.set('port', process.env.PORT);
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(i18n.init);
app.use((req, res, next) => {
  const regex = new RegExp('multipart/form-data');

  if (regex.test(req.headers['content-type'])) {
    const form = new formidable.IncomingForm();

    form.multiples = true;
    form.parse(req, (err, fields, files) => {
      if (err) return console.error(err);

      req.files = files;
      req.body = fields;
      return next();
    });
  } else {
    next();
  }
});
app.use(compression());
app.use(express.static(`${__dirname}/public/`, config.staticResourceCache));

app.use((req, res, next) => {
  res.locals.isProduction = process.env.NODE_ENV === 'production';
  next();
});

require('./routes.js')(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  if (req.xhr) res.status(500).json({ error: err.stack });
  next();
});

// start the server in cluster
if (require.main === module) server(app);
else module.exports = server(app);

module.exports = app;
