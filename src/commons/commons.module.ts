import { Module } from '@nestjs/common';
import { PaginationInput } from './pagination.input';
import { FilterKeyInput } from './filter-key.input';
import { FilterStringInput } from './filter-string.input';
import { FilterBooleanInput } from './filter-boolean.input';
import { FilterIntInput } from './filter-int.input';
import { FilterFloatInput } from './filter-float.input';
import { FilterDatetimeInput } from './filter-datetime.input';

@Module({
  providers: [
    PaginationInput,
    FilterKeyInput,
    FilterStringInput,
    FilterBooleanInput,
    FilterIntInput,
    FilterFloatInput,
    FilterDatetimeInput,
  ],
})
export class CommonsModule {}
