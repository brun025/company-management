import { Company } from '../entities/company.entity';
import { Page } from '../shared/pagination/page';
import { PageOptionsDto } from '../shared/pagination/page-options';

export interface ICompanyRepository {
  findAll(pageOptions: PageOptionsDto): Promise<Page<Company>>;
  findById(id: number): Promise<Company>;
  findByCnpj(cnpj: string): Promise<Company>;
  create(company: Company): Promise<Company>;
  update(id: number, company: Company): Promise<Company>;
  delete(id: number): Promise<void>;
}
