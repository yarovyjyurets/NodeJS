const fs = require('fs');
const {promisify} = require('util');
const {join} = require('path');

const readFileAsync = promisify(fs.readFile);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  singUp: async (toEmail) => {
    const path = join(__dirname, './signUp.html');
    const singUpTemplate = await readFileAsync(path, 'utf-8');
    const msg = {
      to: toEmail,
      from: 'yarovyjyurets@gmail.com',
      subject: 'Welcome to SHOP-NODE',
      html: singUpTemplate,
    };
    return sgMail.send(msg);
  }
};