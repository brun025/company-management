import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class CompanyNotFoundException extends BaseException {
  constructor(id: number) {
    super(`Company with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class CompanyAlreadyExistsException extends BaseException {
  constructor(cnpj: string) {
    super(`Company with CNPJ ${cnpj} already exists`, HttpStatus.CONFLICT);
  }
}

export class InvalidCompanyDataException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
