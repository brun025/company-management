import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/core/domain/entities/company.entity';

export class CompanyViewModel {
  @ApiProperty({
    example: '1',
    description: 'Company ID',
  })
  id!: number;

  @ApiProperty({ example: 'Tesla', description: 'Company name' })
  name!: string;

  @ApiProperty({ example: '67.959.013/0001-63', description: 'Company cnpj' })
  cnpj!: string;

  @ApiProperty({
    example: 'Avenida Barão de Mauá',
    description: 'Company address',
  })
  address!: string;

  @ApiProperty({ example: '(99) 99999-9999', description: 'Company phone' })
  phone!: string;

  @ApiProperty({ example: 'tesla@gmail.com', description: 'Company e-mail' })
  email!: string;

  @ApiProperty({ example: '2025-01-13T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-01-13T10:00:00.000Z' })
  updatedAt!: Date;

  static fromEntity(entity: Company): CompanyViewModel {
    if (!entity.id) {
      throw new Error('Cannot create ViewModel: Entity must have an ID');
    }

    const viewModel = new CompanyViewModel();
    viewModel.id = entity.id;
    viewModel.name = entity.name;
    viewModel.cnpj = entity.cnpj;
    viewModel.address = entity.address;
    viewModel.phone = entity.phone;
    viewModel.email = entity.email;
    viewModel.createdAt = new Date();
    viewModel.updatedAt = new Date();

    return viewModel;
  }

  static fromEntities(entities: Company[]): CompanyViewModel[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
