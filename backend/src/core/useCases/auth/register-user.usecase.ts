import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { ITokenService } from '../../domain/services/token.service.interface';
import { RegisterUserDto } from 'src/infra/http/dtos/register.user.dto';
import { AuthResponseDto } from 'src/infra/http/dtos/auth-response.dto';
import { UserAlreadyExistsError } from 'src/core/domain/exceptions/auth.errors';
import { IPasswordService } from 'src/core/domain/services/password.service.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: RegisterUserDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(dto.email);
    }

    const hashedPassword = await this.passwordService.hash(dto.password);

    const user = new User({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
    });

    const createdUser = await this.userRepository.create(user);

    const token = this.tokenService.generateToken({
      sub: createdUser.id!,
      email: createdUser.email,
    });

    return {
      accessToken: token,
      user: {
        id: createdUser.id!,
        email: createdUser.email,
        name: createdUser.name,
      },
    };
  }
}
