import { Injectable } from '@nestjs/common';
import { GeneratedAqlQuery, aql } from 'arangojs/aql';
import {
  IFilter,
  IFilterToAQL,
  IContextFilterFirst,
  IContextFilterLast,
  ISort,
  IPagination,
} from './object-to-aql.interface';

@Injectable()
export class ObjectToAQL {
  public filtersToAql(filters: any, node = 'doc'): GeneratedAqlQuery[] {
    return this.transformFiltersToArrayFilter(
      filters,
    ).map((filter: IFilterToAQL, index) =>
      index
        ? this.aqlLastFilter({ node, separator: filters.separator, ...filter })
        : this.aqlFirstFilter({ node, ...filter }),
    );
  }

  public sortToAql(sort: any, node = 'doc'): GeneratedAqlQuery[] {
    const aqlSort = this.transformSortToArray(sort).map(
      (key: string, index: number) => {
        return index
          ? this.aqlMediumSort({ node, key })
          : this.aqlFirstSort({ node, key });
      },
    );

    if (aqlSort.length) aqlSort.push(this.aqlLastSort(sort.sort));

    return aqlSort;
  }

  public paginationToAql({ offset, count }: IPagination): GeneratedAqlQuery {
    return aql`LIMIT ${offset}, ${count}`;
  }

  private transformFiltersToArrayFilter(filters: any = {}) {
    const filtersToAQL: IFilterToAQL[] = [];

    Object.keys(filters)
      .filter((key: string) => key !== 'separator')
      .map((key: string) => {
        filters[key].map((filter: IFilter) =>
          filtersToAQL.push({ key, ...filter }),
        );
      });

    return filtersToAQL;
  }

  private aqlFirstFilter({ node, key, operator, value }: IContextFilterFirst) {
    return aql`FILTER ${node}.${aql.literal(key)} ${aql.literal(
      operator,
    )} ${value} `;
  }

  private aqlLastFilter({
    node,
    separator,
    key,
    operator,
    value,
  }: IContextFilterLast) {
    return aql` ${aql.literal(separator)} ${node}.${aql.literal(
      key,
    )} ${aql.literal(operator)} ${value} `;
  }

  private transformSortToArray(sort: any = {}) {
    return Object.keys(sort).filter(
      (key: string) => key !== 'sort' && sort[key],
    );
  }

  private aqlFirstSort({ node, key }: ISort) {
    return aql`SORT ${node}.${aql.literal(key)}`;
  }

  private aqlMediumSort({ node, key }: ISort) {
    return aql`, ${node}.${aql.literal(key)}`;
  }

  private aqlLastSort(sort: string) {
    return aql` ${aql.literal(sort)}`;
  }
}
