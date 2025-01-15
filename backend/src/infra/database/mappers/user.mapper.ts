import { User } from 'src/core/domain/entities/user.entity';
import { UserTypeORM } from '../typeorm/entities/user.typeorm.entity';

export class UserMapper {
  static toDomain(entity: UserTypeORM): User {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    };
  }

  static toTypeORM(domainEntity: User): UserTypeORM {
    const typeORMEntity = new UserTypeORM();

    typeORMEntity.name = domainEntity.name;
    typeORMEntity.password = domainEntity.password;
    typeORMEntity.email = domainEntity.email;

    // Se o ID existir no domínio, atribua-o à entidade TypeORM
    if (domainEntity.id) {
      typeORMEntity.id = domainEntity.id;
    }

    return typeORMEntity;
  }
}
