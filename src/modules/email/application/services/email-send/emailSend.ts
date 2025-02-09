import {  SendMailOptions } from "../../../domain/interfaces/index";
import { EmailRepository } from "../../../domain/repository/EmailRepository";

export class EmailSend{
    constructor(
       private repository: EmailRepository
    ){}

    async run(options: SendMailOptions) : Promise<boolean>{
        return this.repository.sendEmail(options);
    }
}