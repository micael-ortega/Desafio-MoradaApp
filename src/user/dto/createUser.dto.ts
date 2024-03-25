import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'nome não pode estar vazio' })
  @MaxLength(120, { message: 'nome deve conter no máximo 120 caracteres' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email não pode estar vazio' })
  @MaxLength(320, { message: 'email deve conter no máximo 320 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'descrição não pode estar vazio' })
  @MaxLength(420, { message: 'descrição deve conter no máximo 420 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'senha não pode estar vazio' })
  @MinLength(6, { message: 'senha deve conter no mínimo 6 caracteres' })
  @MaxLength(60, { message: 'senha deve conter no máximo 60 caracteres' })
  password: string;
}
