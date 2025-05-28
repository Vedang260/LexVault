import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ChatRoom } from "../entities/chatRoom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "../entities/message.entity";
import { CreateChatRoomDto } from "../dtos/createChatRoom.dto";
import { CreateMessageDto } from "../dtos/createMessage.dto";

@Injectable()
export class ChatRepository{
    constructor(
        @InjectRepository(ChatRoom)
        private readonly chatRepository: Repository<ChatRoom>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {} 

    async createChatRoom(createChatRoomDto: CreateChatRoomDto){
        try{
            const newChatRoom = this.chatRepository.create(createChatRoomDto);
            return await this.chatRepository.save(newChatRoom);
        }catch(error){
            console.error('Error in creating a new Chat Room');
            throw new InternalServerErrorException('Error in creating a new Chat Room');
        }
    }

    async createMessage(senderId: string, createMessageDto: CreateMessageDto){
        try{
            const newMessage = this.messageRepository.create({ ...createMessageDto, senderId});
            return await this.messageRepository.save(newMessage);
        }catch(error){
            console.error('Error in creating new message: ', error.message);
            throw new InternalServerErrorException('Error in creating new Messages');
        }
    }

    async getAllMessagesOfChatRoom(chatRoomId: string){
        try{
            return await this.messageRepository.find({
                where: { chatRoomId },
                relations: [ 'user' ],
                select:{
                    messageId: true,
                    chatRoomId: true,
                    senderId: true,
                    content: true,
                    user: {
                        firstName: true,
                        lastName: true,
                        role: true,
                    },
                    createdAt: true
                }
            }); 
        }catch(error){
            console.error('Error in fetching all the Chat Messages: ', error.message);
            throw new InternalServerErrorException('Error in fetching all the messages of the chat Room');
        }
    }

    async getChatRoom(caseId: string){
        try{
            return await this.chatRepository.find({
                where: { caseId }
            });
        }catch(error){
            console.error('Error in fetching the chat Room: ', error.message);
            throw new InternalServerErrorException('Error in fetching the chat Room');
        }
    }
}