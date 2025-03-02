import { DateTime } from "luxon";

export default class DateTimeService {
    public dateTime: typeof DateTime = DateTime;
    constructor(){
        this.dateTime = DateTime;
    }
}