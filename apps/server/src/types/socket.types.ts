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

export interface UserDto {
  id: string;
  name: string;
  color: string;
}

export interface CursorPosition {
  anchor: number;
  head: number;
}

export interface JoinDocumentDto {
  documentId: string;
  user: UserDto;
}

export interface LeaveDocumentDto {
  documentId: string;
}

export interface UpdateCursorDto {
  documentId: string;
  cursor: CursorPosition;
}

export interface UpdateDocumentDto {
  documentId: string;
  update: Uint8Array;
}