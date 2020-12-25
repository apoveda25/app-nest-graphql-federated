import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorNumber {
  EQUAL = 'EQUAL',
  DISTINCT = 'DISTINCT',
  LESS = 'LESS',
  LESS_EQUAL = 'LESS EQUAL',
  GREATER = 'GREATER',
  GREATER_EQUAL = 'GREATER EQUAL',
}

registerEnumType(ComparisonOperatorNumber, {
  name: 'ComparisonOperatorNumber',
  description: 'Comparison operators for number values.',
});
