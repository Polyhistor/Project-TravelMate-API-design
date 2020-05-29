const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log(options);

  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  // 2) Define the email options
  const emailOptions = {
    from: 'Pouya Ataei <pouya.ataei.7@gamail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send the email
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
