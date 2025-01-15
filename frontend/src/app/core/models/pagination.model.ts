export interface PaginatedResponse<T> {
    data: T[];
    meta: {
      page: string;
      limit: string;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  }