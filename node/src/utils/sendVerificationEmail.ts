import nodemailer from 'nodemailer';

const DEFAULT_CLIENT_URL = 'http://localhost:5173';

export const sendVerificationEmail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SENDER, // כתובת המייל שלך
      pass: process.env.EMAIL_PASS    // סיסמה או App password
    }
  });

  const clientUrl = (process.env.CLIENT_URL || DEFAULT_CLIENT_URL).replace(/\/+$/, '');
  const url = `${clientUrl}/verify-email/${token}`;

  await transporter.sendMail({
    from: `"EasyWay" <${process.env.EMAIL_SENDER}>`,
    to,
    subject: 'Verify your email',
    html: `
      <p>Hello! Click the button below to verify your email:</p>
      <a href="${url}" style="padding:10px 20px;background:#1abc9c;color:white;border-radius:5px;text-decoration:none;">Verify Email</a>
    `
  });
};
