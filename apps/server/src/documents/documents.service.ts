import { Injectable, NotFoundException } from '@nestjs/common';
import { Document, CreateDocumentDto, UpdateDocumentDto } from './document.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];

  findAll(userId: string): Document[] {
    return this.documents.filter(
      doc => doc.ownerId === userId || doc.collaborators.includes(userId)
    );
  }

  findOne(id: string): Document {
    const document = this.documents.find(doc => doc.id === id);
    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    return document;
  }

  create(createDocumentDto: CreateDocumentDto): Document {
    const newDocument: Document = {
      id: uuidv4(),
      ...createDocumentDto,
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.documents.push(newDocument);
    return newDocument;
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto): Document {
    const documentIndex = this.documents.findIndex(doc => doc.id === id);
    if (documentIndex === -1) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    
    const updatedDocument = {
      ...this.documents[documentIndex],
      ...updateDocumentDto,
      updatedAt: new Date(),
    };
    
    this.documents[documentIndex] = updatedDocument;
    return updatedDocument;
  }

  remove(id: string): void {
    const documentIndex = this.documents.findIndex(doc => doc.id === id);
    if (documentIndex === -1) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    
    this.documents.splice(documentIndex, 1);
  }

  addCollaborator(documentId: string, userId: string): Document {
    const document = this.findOne(documentId);
    
    if (!document.collaborators.includes(userId) && document.ownerId !== userId) {
      document.collaborators.push(userId);
      document.updatedAt = new Date();
    }
    
    return document;
  }

  removeCollaborator(documentId: string, userId: string): Document {
    const document = this.findOne(documentId);
    
    document.collaborators = document.collaborators.filter(id => id !== userId);
    document.updatedAt = new Date();
    
    return document;
  }
}