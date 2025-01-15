import { ApiProperty } from '@nestjs/swagger';

export class PageMetaResponseDto {
  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    description: 'Items per page',
    example: 10,
  })
  readonly limit: number;

  @ApiProperty({
    description: 'Items per page',
    example: 100,
  })
  readonly itemCount: number;

  @ApiProperty({
    description: 'Total page',
    example: 10,
  })
  readonly pageCount: number;

  @ApiProperty({
    description: 'Indicates whether there is a previous page',
    example: false,
  })
  readonly hasPreviousPage: boolean;

  @ApiProperty({
    description: 'Indicates whether there is a next page',
    example: true,
  })
  readonly hasNextPage: boolean;
}
