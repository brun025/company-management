import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../../infra/http/presentation/controllers/company.controller';
import { CompanyTypeORM } from '../../infra/database/typeorm/entities/company.typeorm.entity';
import { CompanyTypeORMRepository } from '../../infra/database/typeorm/repositories/company.typeorm.repository';
import { CreateCompanyUseCase } from '../../core/useCases/company/create-company.usecase';
import { UpdateCompanyUseCase } from '../../core/useCases/company/update-company.usecase';
import { DeleteCompanyUseCase } from '../../core/useCases/company/delete-company.usecase';
import { FindAllCompaniesUseCase } from '../../core/useCases/company/find-all-companies.usecase';
import { FindCompanyByIdUseCase } from '../../core/useCases/company/find-company-by-id.usecase';
import { RedisCacheService } from '../../infra/database/cache/redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyTypeORM]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as any,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: 3600,
        max: 1000,
      }),
    }),
  ],
  controllers: [CompanyController],
  providers: [
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    DeleteCompanyUseCase,
    FindAllCompaniesUseCase,
    FindCompanyByIdUseCase,
    RedisCacheService,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyTypeORMRepository,
    },
  ],
})
export class CompanyModule {}
