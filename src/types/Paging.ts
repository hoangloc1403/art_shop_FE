export type Paging<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
