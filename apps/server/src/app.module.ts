import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CollaborationModule } from './collaboration/collaboration.module';

@Module({
  imports: [
    AuthModule,
    CollaborationModule,
    // Add more modules like RoomsModule, UsersModule here as you build them
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
