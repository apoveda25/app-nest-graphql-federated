import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { OperatorSort } from '../../commons/enums/operator-sort.enum';

@InputType()
export class SortUserInput {
  @Field(() => Boolean, {
    description: 'Example field: true',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  _key?: boolean;

  @Field(() => Boolean, {
    description: 'Example field: name@domain.com',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @Field(() => Boolean, {
    description: 'Example field: username',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  username?: boolean;

  @Field(() => Boolean, { description: 'Example field: name', nullable: true })
  @IsBoolean()
  @IsOptional()
  name?: boolean;

  @Field(() => Boolean, { description: 'Example field: name', nullable: true })
  @IsBoolean()
  @IsOptional()
  surname?: boolean;

  @Field(() => Boolean, { description: 'Example field: name', nullable: true })
  @IsBoolean()
  @IsOptional()
  createdBy?: boolean;

  @Field(() => Boolean, { description: 'Example field: name', nullable: true })
  @IsBoolean()
  @IsOptional()
  updatedBy?: boolean;

  @Field(() => Boolean, { description: 'Example field: name', nullable: true })
  @IsBoolean()
  @IsOptional()
  createdAt?: boolean;

  @Field(() => Boolean, { description: 'Example field: name', nullable: true })
  @IsBoolean()
  @IsOptional()
  updatedAt?: boolean;

  @Field(() => OperatorSort, { description: 'Example field: name' })
  @IsString()
  sort: OperatorSort;
}
