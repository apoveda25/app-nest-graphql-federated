import { Injectable } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsString } from 'class-validator';
import { ComparisonOperatorDatetime } from './enums/comparison-operator-datetime.enum';

@Injectable()
@InputType()
export class FilterDatetimeInput {
  @Field(() => String, {
    description: 'Example field: 2017-06-07T14:34:08.700Z',
  })
  @IsDateString()
  value: string;

  @Field(() => ComparisonOperatorDatetime, {
    description: 'Example field: EQUAL',
  })
  @IsString()
  operator: string;
}
