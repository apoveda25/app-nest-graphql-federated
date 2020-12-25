import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorString {
  EQUAL = 'EQUAL',
  DISTINCT = 'DISTINCT',
  LESS = 'LESS',
  LESS_EQUAL = 'LESS EQUAL',
  GREATER = 'GREATER',
  GREATER_EQUAL = 'GREATER EQUAL',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT LIKE',
  REGEX = 'REGEX',
  NOT_REGEX = 'NOT REGEX',
}

registerEnumType(ComparisonOperatorString, {
  name: 'ComparisonOperatorString',
  description: 'Comparison operators for string values.',
});
