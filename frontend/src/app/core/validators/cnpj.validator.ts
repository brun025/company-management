import { AbstractControl, ValidationErrors } from '@angular/forms';
import { cnpj } from 'cpf-cnpj-validator';

export class CnpjValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.replace(/[^\d]/g, '');
    
    if (!value) return { required: true };
    if (!cnpj.isValid(value)) return { invalid: true };
    
    return null;
  }
}