interface ctlObject {
    id: number;
    name: string;
}
interface personObject {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
}

export type PostgresAddress = {
    id: number;
    person: personObject;
    street: string;
    street_number: string;
    neighborhood: string;
    id_district: number;
    house_number: number;
    block: string;
    pathway: string;
    description: string;
    current: boolean;
    active: boolean;
    ctl_district: ctlObject;
    ctl_municipality: ctlObject;
    ctl_department: ctlObject;
    ctl_country: ctlObject;
}

