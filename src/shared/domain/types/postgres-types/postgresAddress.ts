interface ctlObject {
    id: number;
    name: string;
}

export type PostgresAddress = {
    id: number;
    id_people: number;
    street: string;
    street_number: string;
    neighborhood: string;
    id_district: number;
    house_number: number;
    block: string;
    pathway: string;
    description: string;
    current: boolean;
    ctl_district: ctlObject;
    ctl_municipality: ctlObject;
    ctl_department: ctlObject;
    ctl_country: ctlObject;
}

