import nodemailer from "nodemailer";
import { envs } from "../../../../../shared/infrastructure/config/envs";
import { Attachement, SendMailOptions } from "../../../domain/interfaces/index";
import { EmailRepository } from "../../../../auth/domain";
//import { TransportAuthOptions } from "../../../domain/interfaces/TransportAuthOptionInterface";
import { TransportOptionsRepo } from "../../../domain/interfaces/TransportOptionsInterface";
export class ImplEmailService implements EmailRepository {
  constructor(private transportOptions : TransportOptionsRepo){
  }
  private transport = nodemailer.createTransport(this.transportOptions);

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
