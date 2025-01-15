// src/auth/infrastructure/__tests__/user.typeorm.repository.spec.ts
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeORMRepository } from '../database/typeorm/repositories/user.typeorm.repository';
import { UserTypeORM } from '../database/typeorm/entities/user.typeorm.entity';

describe('UserTypeORMRepository', () => {
  let repository: UserTypeORMRepository;
  let typeormRepository: Repository<UserTypeORM>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserTypeORMRepository,
        {
          provide: getRepositoryToken(UserTypeORM),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = moduleRef.get<UserTypeORMRepository>(UserTypeORMRepository);
    typeormRepository = moduleRef.get<Repository<UserTypeORM>>(
      getRepositoryToken(UserTypeORM),
    );
  });

  describe('findByEmail', () => {
    it('should return null when user not found', async () => {
      jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(null);

      const result = await repository.findByEmail('test@example.com');
      expect(result).toBeNull();
    });

    it('should return user when found', async () => {
      const userEntity = new UserTypeORM();
      userEntity.email = 'test@example.com';
      userEntity.name = 'Test User';
      userEntity.password = 'hashedPassword';

      jest.spyOn(typeormRepository, 'findOne').mockResolvedValue(userEntity);

      const result = await repository.findByEmail('test@example.com');
      expect(result).toBeDefined();
      expect(result?.email).toBe(userEntity.email);
    });
  });
});
