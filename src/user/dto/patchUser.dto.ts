import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'nome não pode estar vazio' })
  @MaxLength(120, { message: 'nome deve conter no máximo 120 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'descrição não pode estar vazio' })
  @MaxLength(420, { message: 'descrição deve conter no máximo 420 caracteres' })
  description: string;
}
