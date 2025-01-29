import { EmailRepository, SendMailOptions } from "../../../../domain";

export class EmailSend{
    constructor(
       private repository: EmailRepository
    ){}

    async run(options: SendMailOptions) : Promise<boolean>{
        return this.repository.sendEmail(options);
    }
}