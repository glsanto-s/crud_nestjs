import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validator/email-unico.validator";

export class CriaUserDto{

    @IsNotEmpty({message:'O nome não pode ser vazio'})
    nome: string;

    @IsEmail(undefined, {message: 'O email não pode ser vazio'})
    @EmailUnico({message:'O email já esta sendo usado em outro usuário!'})
    email: string; 

    @MinLength(6,{message: 'A senha precisa ter no mínimo seis caracteres'})
    senha: string;
}