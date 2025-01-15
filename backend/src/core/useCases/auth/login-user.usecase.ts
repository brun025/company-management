import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { ITokenService } from '../../domain/services/token.service.interface';
import { LoginUserDto } from 'src/infra/http/dtos/login-user.dto';
import { AuthResponseDto } from 'src/infra/http/dtos/auth-response.dto';
import { InvalidCredentialsError } from 'src/core/domain/exceptions/auth.errors';
import { IPasswordService } from 'src/core/domain/services/password.service.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const token = this.tokenService.generateToken({
      sub: user.id!,
      email: user.email,
    });

    return {
      accessToken: token,
      user: {
        id: user.id!,
        email: user.email,
        name: user.name,
      },
    };
  }
}
