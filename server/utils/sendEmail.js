import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourmail@gmail.com",
      pass: "your_app_password"
    }
  });

  await transporter.sendMail({
    from: "yourmail@gmail.com",
    to,
    subject,
    text
  });
};