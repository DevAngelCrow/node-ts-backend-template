import { StatusUserDescription, StatusUserId, StatusUserName } from "../../value-object";

export class StatusUser{
    constructor(
        readonly name: StatusUserName,
        readonly description: StatusUserDescription,
        readonly id?: StatusUserId
    ){}
}