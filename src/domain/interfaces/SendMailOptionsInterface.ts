import { Attachement } from "./index";

export interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[]
}