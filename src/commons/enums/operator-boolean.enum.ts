import { registerEnumType } from '@nestjs/graphql';

export enum OperatorBoolean {
  AND,
  OR,
}

registerEnumType(OperatorBoolean, {
  name: 'OperatorBoolean',
  description: 'Support for boolean operators.',
});
