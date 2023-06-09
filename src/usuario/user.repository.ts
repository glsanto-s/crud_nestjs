import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioEntity } from "./user.entity";

@Injectable()
export class UsuarioRepository{
    // criando uma lista/array para salvar os dados
    private usuarios: UsuarioEntity[] =  [];

    // salvando a partir desse método e chamando no user.controller
    async salvar(usuario: UsuarioEntity){
        // fazendo push no array
        this.usuarios.push(usuario);
    }

    async listar(){
        return this.usuarios;
    }

    async pesquisaEmail(email){
        const possivelEmail = this.usuarios.find(
            usuario => usuario.email === email
        );
        return possivelEmail !== undefined;
    }
    
    private buscarId(id: string){
        const possivelUser = this.usuarios.find(
            userSalvo => userSalvo.id === id
        );
        
        if(!possivelUser){
            throw new NotFoundException('Usuário não existente!')
        }
        return possivelUser;
    }

    async atualiza(id: string, dadosAtualizados: Partial<UsuarioEntity>){
        const user = this.buscarId(id);

        Object.entries(dadosAtualizados).forEach( ([chave , valor]) => {
            user[chave] = valor;
        });
        return user;
    }
    
    async deleta(id: string){
        const user = this.buscarId(id);

        //.filter - método que deleta o usuário
        this.usuarios = this.usuarios.filter(
            userSalvo => userSalvo.id !== id
        );
        return user;
    }
}