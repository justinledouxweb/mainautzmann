'use strict';

const handlebars = require('express-handlebars');
const handlebarsConfig = require('./handlebars-config.js');
const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('home', {
      layout: 'main.handlebars',
    });
  });

  app.post('/contact', (req, res) => {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi;

    if (Object.keys(req.body).length > 0) {
      const hasValidFullName = req.body.hasOwnProperty('fullName') && req.body.fullName !== '';
      const hasValidEmail = req.body.hasOwnProperty('email') && req.body.email !== '' && emailRegex.test(req.body.email);
      const hasValidMessage = req.body.hasOwnProperty('message') && req.body.message !== '';

      req.body.message = req.body.message.replace('/(?:\r\n|\r|\n)/g', '<br>');

      if (hasValidFullName && hasValidEmail && hasValidMessage) {
        sendEmail({
          from: `Maina Utzmann Website <${process.env.EMAIL_USER}>`,
          to: `${req.body.fullName} <${req.body.email}>`,
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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
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
