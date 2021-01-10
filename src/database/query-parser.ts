import { Injectable } from '@nestjs/common';
import { aql, GeneratedAqlQuery } from 'arangojs/aql';

@Injectable()
export class QueryParser {
  public filtersToAql(filters: any, node = 'doc'): GeneratedAqlQuery[] {
    return Object.keys(filters || {})
      .filter((key: string) => key !== 'separator')
      .map((key: string, i: number) => {
        return filters[key].map(
          (el: { value: any; operator: string }, j: number) => {
            return i === 0 && j === 0
              ? aql`FILTER ${node}.${aql.literal(key)} ${aql.literal(
                  el.operator,
                )} ${el.value} `
              : aql` ${aql.literal(filters.separator)} ${node}.${aql.literal(
                  key,
                )} ${aql.literal(el.operator)} ${el.value} `;
          },
        );
      })
      .reduce((total: any[], currentValue: any[], currentIndex: number) =>
        currentIndex === 0 ? currentValue : [...total, ...currentValue],
      );
  }

  public sortToAql(sort: any, node = 'doc'): GeneratedAqlQuery[] {
    const sortQuery = Object.keys(sort || {})
      .filter((key: string) => sort[key])
      .filter((key: string) => key !== 'sort')
      .map((key: string, i: number) => {
        return i === 0
          ? aql`SORT ${node}.${aql.literal(key)}`
          : aql`, ${node}.${aql.literal(key)}`;
      });

    if (sort) sortQuery.push(aql` ${aql.literal(sort.sort)}`);

    return sortQuery;
  }

  public paginationToAql(pagination: {
    offset: number;
    count: number;
  }): GeneratedAqlQuery {
    return aql`LIMIT ${pagination.offset}, ${pagination.count}`;
  }
}
