export type PostgresPeople = {
    id: number;
    first_name: string;
    middle_name?: string | null;
    last_name: string | null;
    birthdate: Date;
    ctl_gender: {[key:string]:any};
    //id_gender: number;
    email: string;
    ctl_marital_status: {[key:string]:any};
    //id_marital_status: number;
    img_path?: string | null;
    phone: string;
    has_insurance: boolean | null;
    ctl_status_people: {[key:string]:any};
    //id_status: number;
    people_country: {[key:string]:any}[];
}