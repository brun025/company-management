import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company.entity';
import { CompanyAlreadyExistsException } from '../../domain/exceptions/company.exceptions';
import { ICompanyRepository } from 'src/core/domain/repositories/company.repository.interface';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(company: Company): Promise<Company> {
    const existingCompany = await this.companyRepository.findByCnpj(
      company.cnpj,
    );
    if (existingCompany) {
      throw new CompanyAlreadyExistsException(company.cnpj);
    }

    return await this.companyRepository.create(company);
  }
}
