const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'mail.payfarm.org',
    port: 465,
    secure: true,
    auth: {
      user: "service@payfarm.org",
      pass: "Q?[cZ(VvDmJV"
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Prestige <service@payfarm.org>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;