import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CollaborationGateway {
  @WebSocketServer()
  server: Server;

  // Add socket event handlers here
}
