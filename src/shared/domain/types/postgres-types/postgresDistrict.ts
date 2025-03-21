export type PostgresDistrict = {
  id: number;
  id_municipality: number;
  name: string;
  description?: string | null;
  state?: boolean | null;
  ctl_municipality: {
    id: number;
    idDepartament: { id: number };
    name: string;
    description?: string | null;
  };
};
