import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import * as Y from 'yjs';
import { SocketEvents } from '../types/socket.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CollaborationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('CollaborationGateway');
  private documents = new Map<string, Y.Doc>();
  private userRooms = new Map<string, string>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Remove user from rooms
    const roomId = this.userRooms.get(client.id);
    if (roomId) {
      this.userRooms.delete(client.id);
      
      // Notify others in the room that user has left
      client.to(roomId).emit(SocketEvents.USER_LEFT, { userId: client.id });
    }
  }

  @SubscribeMessage(SocketEvents.JOIN_DOCUMENT)
  handleJoinDocument(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { documentId: string; user: { id: string; name: string; color: string } },
  ) {
    const { documentId, user } = data;
    
    // Join the document room
    client.join(documentId);
    this.userRooms.set(client.id, documentId);
    
    this.logger.log(`Client ${client.id} joined document: ${documentId}`);
    
    // Notify others in the room
    client.to(documentId).emit(SocketEvents.USER_JOINED, {
      userId: client.id,
      user,
    });

    // Return currently connected users
    return {
      event: SocketEvents.JOIN_DOCUMENT,
      data: {
        success: true,
        documentId,
      },
    };
  }

  @SubscribeMessage(SocketEvents.LEAVE_DOCUMENT)
  handleLeaveDocument(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { documentId: string },
  ) {
    const { documentId } = data;
    
    // Leave the document room
    client.leave(documentId);
    this.userRooms.delete(client.id);
    
    // Notify others that the user has left
    client.to(documentId).emit(SocketEvents.USER_LEFT, { userId: client.id });
    
    this.logger.log(`Client ${client.id} left document: ${documentId}`);

    return {
      event: SocketEvents.LEAVE_DOCUMENT,
      data: {
        success: true,
      },
    };
  }

  @SubscribeMessage(SocketEvents.UPDATE_CURSOR)
  handleCursorUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { documentId: string; cursor: { anchor: number; head: number } },
  ) {
    const { documentId, cursor } = data;
    
    // Broadcast cursor position to everyone else in the document
    client.to(documentId).emit(SocketEvents.CURSOR_UPDATE, {
      userId: client.id,
      cursor,
    });
    
    return {
      event: SocketEvents.UPDATE_CURSOR,
      data: {
        success: true,
      },
    };
  }

  // In a real implementation, we would have update document logic here
  // But for this demo we're using Y.js and Y-websocket instead
}