import { Inject, Injectable } from '@nestjs/common';
import { CompanyNotFoundException } from '../../domain/exceptions/company.exceptions';
import { RedisCacheService } from '../../../infra/database/cache/redis.service';
import { ICompanyRepository } from 'src/core/domain/repositories/company.repository.interface';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    private readonly cacheService: RedisCacheService,
  ) {}

  async execute(id: number): Promise<void> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new CompanyNotFoundException(id);
    }

    await this.companyRepository.delete(id);
    await this.cacheService.del('companies');
    await this.cacheService.del(`companies:${id}`);
  }
}
