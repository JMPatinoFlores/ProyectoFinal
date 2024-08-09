import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config as config } from 'dotenv';
import { CreateCustomerDto } from 'src/customers/customers.dto';
import * as path from 'path';
import * as fs from 'fs';

config({ path: './.development.env' });
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL as string,
        pass: process.env.PASS as string,
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

  async sendWelcomeEmail(customer: CreateCustomerDto) {
    const emailTemplatePath = path.join(
      __dirname,
      '../helper/correos-nodemailer/correos-nodemailer/registerUser/index.html',
    );

    let htmlTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    htmlTemplate = htmlTemplate.replace('[Nombre del Usuario]', customer.name);

    await this.sendMail(
      customer.email,
      'Bienvenido a Ruta Viajera',
      'Gracias por registarte en nuestra plataforma',
      htmlTemplate,
    );
  }
}
