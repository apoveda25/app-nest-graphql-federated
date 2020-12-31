import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IContext } from '../../commons/interfaces/context';

@Injectable()
export class ScopesUpdatePipe implements PipeTransform {
  private context: IContext;

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'custom' && metadata.data === 'user') {
      this.context = value;
      return value;
    }

    return value.map((el) => ({ ...el, updatedBy: this.context._id }));
  }
}
