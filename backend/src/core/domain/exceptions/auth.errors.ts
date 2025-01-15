import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class InvalidCredentialsError extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UserAlreadyExistsError extends BaseException {
  constructor(email: string) {
    super(`User with email ${email} already exists`, HttpStatus.CONFLICT);
  }
}

export class UserNotFoundError extends BaseException {
  constructor(id: number | string) {
    super(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
