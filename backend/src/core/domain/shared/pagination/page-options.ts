export class PageOptionsDto {
  page: number;
  limit: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
}
