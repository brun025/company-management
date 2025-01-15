import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company.entity';
import { PageOptionsDto } from 'src/core/domain/shared/pagination/page-options';
import { Page } from 'src/core/domain/shared/pagination/page';
import { ICompanyRepository } from 'src/core/domain/repositories/company.repository.interface';

@Injectable()
export class FindAllCompaniesUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(pageOptions: PageOptionsDto): Promise<Page<Company>> {
    return await this.companyRepository.findAll(pageOptions);
  }
}
