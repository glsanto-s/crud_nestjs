import { Module } from "@nestjs/common";
import { UsuarioController } from "./user.controller";
import { UsuarioRepository } from "./user.repository";
import { EmailUnicoValidator } from "./validator/email-unico.validator";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailUnicoValidator]
})
export class UsuarioModule{}