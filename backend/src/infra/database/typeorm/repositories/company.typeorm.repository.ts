import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../../../core/domain/entities/company.entity';
import { CompanyTypeORM } from '../entities/company.typeorm.entity';
import { CompanyMapper } from '../../mappers/company.mapper';
import { PageOptionsDto } from 'src/core/domain/shared/pagination/page-options';
import { Page } from 'src/core/domain/shared/pagination/page';
import { PageMetaDto } from 'src/core/domain/shared/pagination/page-meta';
import { ICompanyRepository } from 'src/core/domain/repositories/company.repository.interface';

@Injectable()
export class CompanyTypeORMRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyTypeORM)
    private readonly repository: Repository<CompanyTypeORM>,
  ) {}

  async findAll(pageOptions: PageOptionsDto): Promise<Page<Company>> {
    const queryBuilder = this.repository.createQueryBuilder('company');

    queryBuilder
      .skip((pageOptions.page - 1) * pageOptions.limit)
      .take(pageOptions.limit);

    if (pageOptions.orderBy) {
      queryBuilder.orderBy(
        `company.${pageOptions.orderBy}`,
        pageOptions.order || 'ASC',
      );
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    const companies = entities.map((entity) => CompanyMapper.toDomain(entity));
    const pageMetaDto = new PageMetaDto(
      pageOptions.page,
      pageOptions.limit,
      itemCount,
    );

    return new Page(companies, pageMetaDto);
  }

  async findById(id: number): Promise<Company> {
    const company = await this.repository.findOne({ where: { id } });
    return company ? CompanyMapper.toDomain(company) : null;
  }

  async findByCnpj(cnpj: string): Promise<Company> {
    const company = await this.repository.findOne({ where: { cnpj } });
    return company ? CompanyMapper.toDomain(company) : null;
  }

  async create(company: Company): Promise<Company> {
    const typeormEntity = CompanyMapper.toTypeOrm(company);
    const created = await this.repository.save(typeormEntity);
    return CompanyMapper.toDomain(created);
  }

  async update(id: number, company: Company): Promise<Company> {
    const updateData = CompanyMapper.toTypeOrmPartial(company);
    await this.repository.update(id, updateData);
    const updated = await this.repository.findOne({ where: { id } });
    return CompanyMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
