// src/auth/infrastructure/repositories/user.typeorm.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeORM } from '../entities/user.typeorm.entity';
import { IUserRepository } from 'src/core/domain/repositories/user.repository.interface';
import { User } from 'src/core/domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserTypeORMRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeORM)
    private readonly repository: Repository<UserTypeORM>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { email } });
    if (!userEntity) return null;
    return UserMapper.toDomain(userEntity);
  }

  async create(user: User): Promise<User> {
    const userEntity = UserMapper.toTypeORM(user);
    const created = await this.repository.save(userEntity);
    return UserMapper.toDomain(created);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    if (!userEntity) return null;
    return UserMapper.toDomain(userEntity);
  }
}
