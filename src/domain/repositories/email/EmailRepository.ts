import { SendMailOptions } from "../../interfaces";

export interface EmailRepository{
    sendEmail(options: SendMailOptions) : Promise<boolean>;
    sendEmailWithFile(to: string | string[]) : Promise<boolean>;
}