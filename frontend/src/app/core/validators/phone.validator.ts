import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PhoneValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const phone = control.value?.replace(/[^\d]/g, '');
    
    if (!phone) return { required: true };
    if (phone.length !== 11) return { invalidLength: true };
    
    // Validação de DDD
    const ddd = parseInt(phone.substring(0, 2));
    const validDDDs = Array.from({ length: 99 }, (_, i) => i + 1);
    if (!validDDDs.includes(ddd)) return { invalidDDD: true };

    return null;
  }
}