const handlebars = require('express-handlebars');
const handlebarsConfig = require('./handlebars-config.js');
const nodemailer = require('nodemailer');
const fs = require('fs');
const i18n = require('i18n');
const axios = require('axios').default;

module.exports = app => {
  app.get('/', (req, res) => {
    res.locals.viewLocale = i18n.getLocale() === 'en' ? 'en_US' : 'fr_CA';

    res.render('home', {
      layout: 'main.handlebars',
      language: {
        link: i18n.getLocale() === 'fr' ? 'en' : 'fr',
        label: i18n.getLocale() === 'fr' ? 'Eng' : 'Fr',
      },
    });
  });

  app.get('/en', (req, res) => {
    i18n.setLocale('en');
    res.cookie('i18n', 'en', { maxAge: 900000, httpOnly: true });
    res.redirect('back');
  });

  app.get('/fr', (req, res) => {
    i18n.setLocale('fr');
    res.cookie('i18n', 'fr', { maxAge: 900000, httpOnly: true });
    res.redirect('back');
  });

  app.post('/contact', (req, res) => {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi;

    if (Object.keys(req.body).length > 0) {
      const hasValidFullName = req.body.hasOwnProperty('fullName') && req.body.fullName !== '';
      const hasValidEmail = req.body.hasOwnProperty('email') && req.body.email !== '' && emailRegex.test(req.body.email);
      const hasValidMessage = req.body.hasOwnProperty('message') && req.body.message !== '';

      req.body.message = req.body.message.replace('/(?:\r\n|\r|\n)/g', '<br>');

      console.log(process.env.CAPTCHA_SECRET);
      console.log(req.body.captcha);
      
      if (hasValidFullName && hasValidEmail && hasValidMessage) {
        axios({
          method: 'post',
          url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${req.body.captcha}`,
        })
        .then((response) => {
          if (response.data.success) {
            sendEmail({
              from: `${req.body.fullName} <${req.body.email}>`,
              // to: 'Maïna Utzmann Website <maina_utzmann@yahoo.com>',
              to: 'Maïna Utzmann Website <justin.ledoux@quickseries.com>',
              subject: 'New Contact',
              emailTemplate: {
                path: 'views/email-template/contact-email.handlebars',
                data: req.body,
              },
            })
            .then((response) => {
              res
                .status(200)
                .json({
                  success: true,
                  message: response,
                });
            })
            .catch((err) => {
              res
                .status(400)
                .json({
                  error: 'email-client',
                });
            });

            return;
          }

          res
            .status(400)
            .json({
              error: 'robot',
            });
        })
        .catch((error) => {
          res
            .status(400)
            .json({
              error: 'robot',
            });
        });
      } else {
        res
          .status(400)
          .json({
            error: 'validation',
          });
      }
    } else {
      res
        .status(400)
        .json({
          error: 'no-data',
        });
    }
  });
};

function sendEmail(options) {
  return new Promise((resolve, reject) => {
    // Send success email to Lead (client)
    const TRANSPORTER = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.JUSTIN_EMAIL_USER,
        pass: process.env.JUSTIN_EMAIL_PASSWORD,
      },
    });

    fs.readFile(options.emailTemplate.path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const hdb = handlebars.create(handlebarsConfig.handlebars);
        let template = data.toString();
        
        template = hdb.handlebars.compile(data);
        template = template(options.emailTemplate.data);

        console.log(options.from);

        const mailOptions = {
          from: options.from,
          to: options.to,
          subject: options.subject,
          html: template,
          text: options.text,
        };

        TRANSPORTER.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(`Message send: ${info.response}`);
          }
        });
      }
    });
  });
}
