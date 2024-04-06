import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
type ValidatableType = string | boolean | number | any[] | object;

@Injectable()
export class UserValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const responseError = errors.flatMap((e) => Object.values(e.constraints));
      throw new BadRequestException(responseError);
    }
    return value;
  }

  private toValidate(metatype: ValidatableType): boolean {
    const types: ValidatableType[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}