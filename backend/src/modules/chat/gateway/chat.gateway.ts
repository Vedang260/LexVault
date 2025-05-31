import {
  WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket,
  OnGatewayConnection, OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { CreateMessageDto } from '../dtos/createMessage.dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../guards/ws_jwt.guard';

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    // console.log('Message is received: ', dto);
    // console.log('Client Info: ', client.user);
    const senderId = client.user?.id;
    const result = await this.chatService.createMessage(dto, senderId);

    if(result?.success){
      console.log('Message is emitted: ', result.message);
        this.server.emit(`newMessage-${dto.chatRoomId}`, result.message);
        return result.message;
    }
    return "";
  }
}
