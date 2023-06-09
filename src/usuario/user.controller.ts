import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./user.repository";
import { CriaUserDto } from "./dto/CriaUser.dto";
import { UsuarioEntity } from "./user.entity";
import { v4 as uuid} from 'uuid';
import { ListaUserDTO } from "./dto/ListaUser.dto";
import { AtualizaUserDto } from "./dto/AtualizaUser.dto";

@Controller('/usuarios')
export class UsuarioController{

    constructor(private usuarioRepository: UsuarioRepository){};
    //instanciando a classe
    // private usuarioRepository = new UsuarioRepository;

    @Post()
    // olha nest os dados do usuários, vamos pegar do body da requisição
    // os dados usuário é do tipo ( : ) CriaUserDto
    async criaUsuario(@Body() dadosUser: CriaUserDto){
        
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosUser.email;
        usuarioEntity.senha = dadosUser.senha;
        usuarioEntity.nome = dadosUser.nome;
        usuarioEntity.id = uuid();

        // chamando a classe depois de instanciá-la
        this.usuarioRepository.salvar(usuarioEntity);
        //devolvendo apenas um id  e uma mensagem
        return { usuario: new ListaUserDTO(usuarioEntity.id, usuarioEntity.nome) , message: 'usuário criado com sucesso!'}
    }

    @Get()
    async listaUsuarios(){
        const usersSalvos = await this.usuarioRepository.listar();
        const usersLista = usersSalvos.map(
            usuario => new ListaUserDTO(
                usuario.id,
                usuario.nome
            )
        );
        return usersLista
    }
    
    @Put('/:id')
    async atualizaUser(@Param('id') id: string, @Body() newDados: AtualizaUserDto){
        const usersAtualizados = await this.usuarioRepository.atualiza(id, newDados);

        return{
            usuario: usersAtualizados,
            message: 'Usuário atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async deletaUser(@Param('id') id: string){
        const userDeletado = await this.usuarioRepository.deleta(id);

        return{
            usuario: userDeletado,
            message: 'Usuário deletado com sucesso!'
        }
    }
}