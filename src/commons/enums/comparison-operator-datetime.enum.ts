import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorDatetime {
  EQUAL = 'EQUAL',
  DISTINCT = 'DISTINCT',
  LESS = 'LESS',
  LESS_EQUAL = 'LESS EQUAL',
  GREATER = 'GREATER',
  GREATER_EQUAL = 'GREATER EQUAL',
}

registerEnumType(ComparisonOperatorDatetime, {
  name: 'ComparisonOperatorDatetime',
  description: 'Comparison operators for datetime values.',
});
