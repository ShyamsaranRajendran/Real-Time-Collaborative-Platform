import { Injectable, Logger } from '@nestjs/common';
import * as Y from 'yjs';

@Injectable()
export class CollaborationService {
  private logger = new Logger(CollaborationService.name);
  private documents = new Map<string, Y.Doc>();

  getOrCreateDocument(documentId: string): Y.Doc {
    if (!this.documents.has(documentId)) {
      const doc = new Y.Doc();
      this.documents.set(documentId, doc);
      this.logger.log(`Created new document with ID: ${documentId}`);
    }
    
    return this.documents.get(documentId)!;
  }

  applyUpdate(documentId: string, update: Uint8Array): void {
    const doc = this.getOrCreateDocument(documentId);
    Y.applyUpdate(doc, update);
  }

  getDocumentState(documentId: string): Uint8Array | null {
    const doc = this.documents.get(documentId);
    if (!doc) return null;
    
    return Y.encodeStateAsUpdate(doc);
  }

  destroyDocument(documentId: string): void {
    const doc = this.documents.get(documentId);
    if (doc) {
      doc.destroy();
      this.documents.delete(documentId);
      this.logger.log(`Destroyed document with ID: ${documentId}`);
    }
  }
}