import { Injectable } from '@nestjs/common';
import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ComparisonOperatorString } from './enums/comparison-operator-string.enum';

@Injectable()
@InputType()
export class FilterKeyInput {
  @Field(() => ID, { description: 'Example field: 100' })
  @IsString()
  value: string;

  @Field(() => ComparisonOperatorString, {
    description: 'Example field: EQUAL',
  })
  @IsString()
  operator: string;
}
