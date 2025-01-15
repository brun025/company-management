import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../core/domain/shared/pagination/page-meta';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({
    description: 'Pagination information',
    example: {
      page: 1,
      limit: 5,
      itemCount: 50,
      pageCount: 10,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
