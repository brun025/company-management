import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class RemoveMaskPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'object' && value !== null) {
      const transformedValue = { ...value };

      // Remove máscara do CNPJ
      if (transformedValue.cnpj) {
        transformedValue.cnpj = transformedValue.cnpj.replace(/[^\d]/g, '');
      }

      // Remove máscara do telefone
      if (transformedValue.phone) {
        transformedValue.phone = transformedValue.phone.replace(/[^\d]/g, '');
      }

      return transformedValue;
    }
    return value;
  }
}
