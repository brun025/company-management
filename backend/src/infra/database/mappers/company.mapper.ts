import { Company } from '../../../core/domain/entities/company.entity';
import { CompanyTypeORM } from '../typeorm/entities/company.typeorm.entity';

export class CompanyMapper {
  static toDomain(entity: CompanyTypeORM): Company {
    return {
      id: entity.id,
      name: entity.name,
      cnpj: entity.cnpj,
      address: entity.address,
      phone: entity.phone,
      email: entity.email,
    };
  }

  static toTypeOrm(domainEntity: Company): CompanyTypeORM {
    const typeORMEntity = new CompanyTypeORM();

    typeORMEntity.name = domainEntity.name;
    typeORMEntity.cnpj = domainEntity.cnpj;
    typeORMEntity.address = domainEntity.address;
    typeORMEntity.phone = domainEntity.phone;
    typeORMEntity.email = domainEntity.email;

    // Se o ID existir no domínio, atribua-o à entidade TypeORM
    if (domainEntity.id) {
      typeORMEntity.id = domainEntity.id;
    }

    return typeORMEntity;
  }

  static toTypeOrmPartial(
    partialData: Partial<Company>,
  ): Partial<CompanyTypeORM> {
    const typeormPartial: Partial<CompanyTypeORM> = {};

    if ('name' in partialData) {
      typeormPartial.name = partialData.name;
    }
    if ('cnpj' in partialData) {
      typeormPartial.cnpj = partialData.cnpj;
    }
    if ('address' in partialData) {
      typeormPartial.address = partialData.address;
    }
    if ('phone' in partialData) {
      typeormPartial.phone = partialData.phone;
    }
    if ('email' in partialData) {
      typeormPartial.email = partialData.email;
    }

    return typeormPartial;
  }

  static toDomainList(typeormEntities: CompanyTypeORM[]): Company[] {
    return typeormEntities.map((typeORMEntity) => this.toDomain(typeORMEntity));
  }
}
