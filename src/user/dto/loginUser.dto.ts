import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class LoginUserDto{

    @IsEmail()
    @IsNotEmpty({message: "email não pode estar vazio"})
    @MaxLength(320, {message: "email deve conter no máximo 320 caracteres"})
    email: string
    
    @IsNotEmpty({message: "senha não pode estar vazio"})
    @MinLength(6, {message:"senha deve conter no mínimo 6 caracteres"})
    password: string
}