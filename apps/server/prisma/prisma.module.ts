// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Optional: Makes PrismaService available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Important!
})
export class PrismaModule {}
