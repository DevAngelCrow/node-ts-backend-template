import { Attachement } from "./AttachementOptionsInterface";

export interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[]
}