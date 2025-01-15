// // src/auth/infrastructure/auth.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserTypeORM } from 'src/infra/database/typeorm/entities/user.typeorm.entity';
// import { UserTypeORMRepository } from 'src/infra/database/typeorm/repositories/user.typeorm.repository';
// import { JwtTokenService } from 'src/infra/services/jwt.service';
// import { BcryptPasswordService } from 'src/infra/services/bcrypt.service';
// import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
// import { JwtAuthGuard } from 'src/infra/guards/jwt.guard';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserTypeORM]),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: '1d' },
//       }),
//     }),
//   ],
//   providers: [
//     UserTypeORMRepository,
//     JwtTokenService,
//     BcryptPasswordService,
//     JwtStrategy,
//     JwtAuthGuard,
//     {
//       provide: 'IUserRepository',
//       useClass: UserTypeORMRepository,
//     },
//     {
//       provide: 'ITokenService',
//       useClass: JwtTokenService,
//     },
//     {
//       provide: 'IPasswordService',
//       useClass: BcryptPasswordService,
//     },
//   ],
//   exports: [
//     'IUserRepository',
//     'ITokenService',
//     'IPasswordService',
//     JwtAuthGuard,
//   ],
// })
// export class AuthInfrastructureModule {}
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTypeORM } from 'src/infra/database/typeorm/entities/user.typeorm.entity';
import { AuthController } from 'src/infra/http/presentation/controllers/auth.controller';
import { RegisterUserUseCase } from 'src/core/useCases/auth/register-user.usecase';
import { LoginUserUseCase } from 'src/core/useCases/auth/login-user.usecase';
import { GetUserProfileUseCase } from 'src/core/useCases/auth/get-user-profile.usecase';
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/infra/guards/jwt.guard';
import { BcryptPasswordService } from 'src/infra/services/bcrypt.service';
import { JwtTokenService } from 'src/infra/services/jwt.service';
import { UserTypeORMRepository } from 'src/infra/database/typeorm/repositories/user.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeORM]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Repositories
    {
      provide: 'IUserRepository',
      useClass: UserTypeORMRepository,
    },

    // Services
    {
      provide: 'ITokenService',
      useClass: JwtTokenService,
    },
    {
      provide: 'IPasswordService',
      useClass: BcryptPasswordService,
    },

    // Auth related providers
    {
      provide: JwtStrategy,
      useFactory: (configService: ConfigService, userRepo) => {
        return new JwtStrategy(configService, userRepo);
      },
      inject: [ConfigService, 'IUserRepository'],
    },
    JwtAuthGuard,

    // Use Cases
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo, passwordService, tokenService) => {
        return new RegisterUserUseCase(userRepo, passwordService, tokenService);
      },
      inject: ['IUserRepository', 'IPasswordService', 'ITokenService'],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepo, passwordService, tokenService) => {
        return new LoginUserUseCase(userRepo, passwordService, tokenService);
      },
      inject: ['IUserRepository', 'IPasswordService', 'ITokenService'],
    },
    {
      provide: GetUserProfileUseCase,
      useFactory: (userRepo) => {
        return new GetUserProfileUseCase(userRepo);
      },
      inject: ['IUserRepository'],
    },
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
