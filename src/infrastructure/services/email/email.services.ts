import nodemailer from "nodemailer";
import { envs } from "../../config/envs";
import { Attachement, EmailRepository, SendMailOptions } from "../../../domain";
export class EmailService implements EmailRepository {
  private transport = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    try {
      const { to, subject, htmlBody, attachements = [] } = options;

      const sendInformation = await this.transport.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  //this is an example to the implement this service
  sendEmailWithFile(to: string | string[]): Promise<boolean> {
    const subject = "Test";
    const htmlBody = `
            <h3>The first test to send a email with a file</h3>
            <p>Good job</p>`;

    const attachements: Attachement[] = [
      { filename: "plano.log", path: "./storage/plano.log" },
      { filename: "testPDF.pdf", path: "./storage/testPDF.pdf" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody,
    });
  }
}
