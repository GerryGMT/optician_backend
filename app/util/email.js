const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "empirepuzzle1930@gmail.com",
      pass: "MasterGMT@1234$$$"
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Kuku <empirepuzzle1930@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;