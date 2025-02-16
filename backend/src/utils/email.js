const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// send verification email
const sendVerificationEmail = async (email, fullName, verificationUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for registering. Please verify your email address to complete your registration and access your account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007bff; 
                    color: white; 
                    padding: 12px 25px; 
                    text-decoration: none; 
                    border-radius: 5px;
                    display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>This verification link will expire in 24 hours.</p>
        <p>If you did not create an account, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// send reset password verification email
const sendResetPasswordEmail = async (email, fullName, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Reset Password</h2>
        <p>Hi ${fullName},</p>
        <p>You have requested to reset your password. Click the button below to set a new password. This link will expire in 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #007bff; 
                    color: white; 
                    padding: 12px 25px; 
                    text-decoration: none; 
                    border-radius: 5px;
                    display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error;
  }
};

// Send password reset success email
const sendPasswordResetSuccessEmail = async (email, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Successfully Reset Your Password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Password Reset Successful</h2>
        <p>Hi ${fullName},</p>
        <p>Your password has been successfully reset. If you did not perform this change, please contact our support immediately.</p>
        <p>Thank you,</p>
        <p>The Support Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset success email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending password reset success email:', error);
    throw error;
  }
};


module.exports = { sendVerificationEmail, sendResetPasswordEmail, sendPasswordResetSuccessEmail };