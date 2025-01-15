import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company.entity';
import {
  CompanyNotFoundException,
  InvalidCompanyDataException,
} from '../../domain/exceptions/company.exceptions';
import { ICompanyRepository } from 'src/core/domain/repositories/company.repository.interface';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(id: number, company: Partial<Company>): Promise<Company> {
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany) {
      throw new CompanyNotFoundException(id);
    }

    if (company.cnpj) {
      const companyWithSameCnpj = await this.companyRepository.findByCnpj(
        company.cnpj,
      );
      if (companyWithSameCnpj && companyWithSameCnpj.id !== id) {
        throw new InvalidCompanyDataException('CNPJ already in use');
      }
    }

    return await this.companyRepository.update(id, {
      ...existingCompany,
      ...company,
    });
  }
}
