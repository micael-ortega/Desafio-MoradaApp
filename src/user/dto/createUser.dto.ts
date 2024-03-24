import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
   
    @IsNotEmpty()
    @MaxLength(120, {message: "nome deve conter no máximo 120 caracteres"})
    name: string

    @IsEmail()
    @MaxLength(320, {message: "email deve conter no máximo 320 caracteres"})
    email: string

    @IsNotEmpty()
    @MaxLength(420, {message: "descrição deve conter no máximo 420 caracteres"})
    description: string
    
    @IsNotEmpty()
    @MinLength(6, {message:"senha deve conter no mínimo 6 caracteres"})
    @MaxLength(60, {message:"senha deve conter no máximo 60 caracteres"})
    password: string
}

