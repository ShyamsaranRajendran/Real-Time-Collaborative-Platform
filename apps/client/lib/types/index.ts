export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  content?: any;
  ownerId: string;
  collaborators?: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic?: boolean;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  content: any;
  createdAt: Date;
  createdBy: string;
  comment?: string;
}

export interface Collaborator {
  userId: string;
  documentId: string;
  role: 'owner' | 'editor' | 'viewer';
  addedAt: Date;
}

export interface UserCursor {
  userId: string;
  username: string;
  color: string;
  anchor: number;
  head: number;
}

export enum SocketEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN_DOCUMENT = 'join_document',
  LEAVE_DOCUMENT = 'leave_document',
  UPDATE_DOCUMENT = 'update_document',
  UPDATE_CURSOR = 'update_cursor',
  ERROR = 'error',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  CURSOR_UPDATE = 'cursor_update',
  DOCUMENT_UPDATED = 'document_updated',
}

export enum Role {
    OWNER = 'owner',
    EDITOR = 'editor',
    VIEWER = 'viewer',
}