import nodemailer, { SentMessageInfo } from 'nodemailer';
import { MailRequestModel } from '../interfaces';

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVER_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export class Mailer {

    constructor() {

    }
    public static async sendEmail(mailData: MailRequestModel): Promise<SentMessageInfo> {
        try {
            const email = {
                from: process.env.MAIL_USER,
                to: mailData.reciever.to,
                cc: mailData.reciever.cc,
                bcc: mailData.reciever.bcc,
                subject: mailData.subject,
                text: mailData.content,
            };
            const response: SentMessageInfo = await transporter.sendMail(email);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }
}