import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InputTransform } from '../utils/input-transform';

@Injectable()
export class InputsQueryPipe implements PipeTransform {
  constructor(private readonly inputTransform: InputTransform) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data === 'filters')
      return this.inputTransform.filtersToArray(value);

    if (metadata.data === 'sort') return this.inputTransform.sortToArray(value);

    return value;
  }
}
