import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company.entity';
import { CompanyNotFoundException } from '../../domain/exceptions/company.exceptions';
import { RedisCacheService } from '../../../infra/database/cache/redis.service';
import { ICompanyRepository } from 'src/core/domain/repositories/company.repository.interface';

@Injectable()
export class FindCompanyByIdUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    private readonly cacheService: RedisCacheService,
  ) {}

  async execute(id: number): Promise<Company> {
    const cacheKey = `companies:${id}`;
    const cachedCompany = await this.cacheService.get<Company>(cacheKey);
    if (cachedCompany) {
      return cachedCompany;
    }

    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new CompanyNotFoundException(id);
    }

    await this.cacheService.set(cacheKey, company, 3600);
    return company;
  }
}
