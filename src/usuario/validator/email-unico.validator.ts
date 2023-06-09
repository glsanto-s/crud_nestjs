import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface{
    constructor(private usuarioRepository: UsuarioRepository){};

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmailExistente = await this.usuarioRepository.pesquisaEmail(value);
        return !usuarioComEmailExistente;
    }
}

//Decorator para validar que o usuário não pode usar um email existente
export const EmailUnico = (opValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        });
    }
}