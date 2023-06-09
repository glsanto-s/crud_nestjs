import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/user.module';

@Module({
  imports: [UsuarioModule]
})
export class AppModule {}
