import { registerEnumType } from '@nestjs/graphql';

export enum OperatorSort {
  ASC,
  DESC,
}

registerEnumType(OperatorSort, {
  name: 'OperatorSort',
  description: 'Support for sort operators.',
});
