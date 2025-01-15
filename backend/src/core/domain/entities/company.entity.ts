export class Company {
  id?: number;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props);
  }
}
