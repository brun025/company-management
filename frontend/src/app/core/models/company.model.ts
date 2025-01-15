export interface Company {
    id?: number;
    name: string;
    cnpj: string;
    address: string;
    phone: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}