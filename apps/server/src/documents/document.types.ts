export interface Document {
  id: string;
  title: string;
  content?: any;
  ownerId: string;
  collaborators: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentDto {
  title: string;
  ownerId: string;
  content?: any;
}

export interface UpdateDocumentDto {
  title?: string;
  content?: any;
}