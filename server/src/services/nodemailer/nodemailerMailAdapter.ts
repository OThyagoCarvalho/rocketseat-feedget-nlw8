import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1717c84e4c367c",
    pass: "4275c3b4a1bdfa"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
 async sendMail({subject, body}: SendMailData) {
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: "Thyago Carvalho <othyagocarvalho@outlook.com>",
    subject,
    html: body
  });
 }
}