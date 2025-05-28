import { Logger, Module } from '@nestjs/common';
import { ChatGateway } from '../gateway/chat.gateway';
import { ChatService } from '../services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { ChatRoom } from '../entities/chatRoom.entity';
import { WsJwtGuard } from '../guards/ws_jwt.guard';
import { ChatRepository } from '../repositories/chat.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatController } from '../controllers/chat.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Message, ChatRoom]),
    JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
            const secret = configService.get<string>('JWT_SECRET');
            Logger.log(`Loaded JWT_SECRET: ${secret}`, 'AuthModule'); // Debugging log
            return {
                secret: secret || 'fallback-secret', // Avoid undefined
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h' },
            };
        },
    })],
    controllers: [ ChatController],
    providers: [ChatGateway, ChatService, WsJwtGuard, ChatRepository],
    exports: [ChatService, ChatRepository]
  
})
export class ChatModule {}
