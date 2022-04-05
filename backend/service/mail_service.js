import nodemailer from "nodemailer";
import "../config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "activation link on " + process.env.API_URL,
      text: "",
      html: `<div>
          <h1> Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>`,
    });
  }
}
export default new MailService();
