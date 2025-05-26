import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CollaborationModule } from './collaboration/collaboration.module';
import { PrismaService } from '../prisma/prisma.service';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [
    DocumentsModule,
    UsersModule,
    AuthModule,
    CollaborationModule,
  ],
  controllers: [AppController, HelloController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}