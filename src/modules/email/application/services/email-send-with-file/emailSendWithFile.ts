import { EmailRepository } from "../../../../email/domain/repository/EmailRepository";

export class EmailSendWithFile{
    constructor(
       private repository: EmailRepository
    ){}

    async run(options: string | string[]) : Promise<boolean>{
        return this.repository.sendEmailWithFile(options);
    }
}