export class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props);
  }
}
