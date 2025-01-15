import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUserProfileUseCase } from 'src/core/useCases/auth/get-user-profile.usecase';
import { LoginUserUseCase } from 'src/core/useCases/auth/login-user.usecase';
import { RegisterUserUseCase } from 'src/core/useCases/auth/register-user.usecase';
import { AuthResponseDto, UserResponseDto } from '../../dtos/auth-response.dto';
import { RegisterUserDto } from '../../dtos/register.user.dto';
import { LoginUserDto } from '../../dtos/login-user.dto';
import { JwtAuthGuard } from 'src/infra/guards/jwt.guard';
import { User } from 'src/core/domain/entities/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponseDto> {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  async login(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile retrieved successfully',
    type: UserResponseDto,
  })
  async getProfile(@CurrentUser() user: User): Promise<UserResponseDto> {
    return this.getUserProfileUseCase.execute(user.id!);
  }
}
