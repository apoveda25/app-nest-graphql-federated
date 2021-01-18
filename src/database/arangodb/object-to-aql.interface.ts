export interface IFilter {
  value: string | boolean | number;
  operator: string;
}

export interface IFilterToAQL extends IFilter {
  key: string;
}

export interface IContextFilterFirst extends IFilterToAQL {
  node: string;
}

export interface IContextFilterLast extends IFilterToAQL {
  node: string;
  separator: string;
}

export interface ISort {
  node: string;
  key: string;
}

export interface IPagination {
  offset: number;
  count: number;
}
