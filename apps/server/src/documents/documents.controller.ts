import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from './document.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: ExpressRequest & { user: { id: string } }) {
    return this.documentsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Request() req: ExpressRequest & { user: { id: string } },
  ) {
    return this.documentsService.create({
      ...createDocumentDto,
      ownerId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/collaborators/:userId')
  addCollaborator(@Param('id') id: string, @Param('userId') userId: string) {
    return this.documentsService.addCollaborator(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/collaborators/:userId')
  removeCollaborator(@Param('id') id: string, @Param('userId') userId: string) {
    return this.documentsService.removeCollaborator(id, userId);
  }
}
