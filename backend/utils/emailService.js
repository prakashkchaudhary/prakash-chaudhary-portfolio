import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  // For production, use a real email service like SendGrid, Mailgun, or AWS SES
  // For development, we'll use a test account
  
  if (process.env.NODE_ENV === 'production') {
    // Production email configuration
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Development: Log to console instead of sending real emails
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@ethereal.email',
        pass: 'test123'
      }
    });
  }
};

// Send verification email
export const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Portfolio Admin'}" <${process.env.SMTP_FROM_EMAIL || 'noreply@portfolio.com'}>`,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <p>If you didn't create this account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Prakash Chaudhary. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 EMAIL (DEV MODE):', {
        to: email,
        subject: mailOptions.subject,
        verificationUrl
      });
      return { success: true, message: 'Email logged (dev mode)' };
    }
    
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Portfolio Admin'}" <${process.env.SMTP_FROM_EMAIL || 'noreply@portfolio.com'}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 30px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 Password Reset</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #f5576c;">${resetUrl}</p>
              <div class="warning">
                <strong>⚠️ Security Note:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
              </div>
              <p>For security reasons, we recommend:</p>
              <ul>
                <li>Using a strong, unique password</li>
                <li>Enabling Multi-Factor Authentication (MFA)</li>
                <li>Never sharing your password with anyone</li>
              </ul>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Prakash Chaudhary. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 EMAIL (DEV MODE):', {
        to: email,
        subject: mailOptions.subject,
        resetUrl
      });
      return { success: true, message: 'Email logged (dev mode)' };
    }
    
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Send MFA setup email
export const sendMFASetupEmail = async (email) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Portfolio Admin'}" <${process.env.SMTP_FROM_EMAIL || 'noreply@portfolio.com'}>`,
      to: email,
      subject: 'Two-Factor Authentication Enabled',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 MFA Enabled</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <div class="success">
                <strong>✅ Success!</strong> Two-Factor Authentication has been successfully enabled on your account.
              </div>
              <p>Your account is now protected with an additional layer of security. You'll need to enter a verification code from your authenticator app each time you log in.</p>
              <p><strong>Important:</strong> Keep your backup codes in a safe place. You'll need them if you lose access to your authenticator app.</p>
              <p>If you didn't enable MFA, please contact support immediately.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Prakash Chaudhary. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 EMAIL (DEV MODE):', {
        to: email,
        subject: mailOptions.subject
      });
      return { success: true, message: 'Email logged (dev mode)' };
    }
    
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    throw new Error('Failed to send MFA setup email');
  }
};

export default {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendMFASetupEmail
};
