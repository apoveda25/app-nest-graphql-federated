import { Injectable } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { ComparisonOperatorBoolean } from './enums/comparison-operator-boolean.enum';

@Injectable()
@InputType()
export class FilterBooleanInput {
  @Field(() => Boolean, { description: 'Example field: true' })
  @IsBoolean()
  value: boolean;

  @Field(() => ComparisonOperatorBoolean, {
    description: 'Example field: EQUAL',
  })
  @IsString()
  operator: string;
}
