import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { from } from 'rxjs';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      port: 587,
      secure: false,
      auth: {
        user: 'projectmgray@gmail.com',
        pass: 'hzrz fuqs vzgs bgab',
      },
    });
  }
  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: 'projectmgray@gmail.com',
      to: to,
      subject: subject,
      text: text,
      html: html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error al enviar el correo: %s', error);
      throw error;
    }
  }
}
