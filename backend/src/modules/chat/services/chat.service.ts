import { Injectable } from "@nestjs/common";
import { ChatRepository } from "../repositories/chat.repository";
import { CreateChatRoomDto } from "../dtos/createChatRoom.dto";
import { CreateMessageDto } from "../dtos/createMessage.dto";

@Injectable()
export class ChatService{
    constructor(
        private chatRepository: ChatRepository
    ){}

    async createChatRoom(createChatRoomDto: CreateChatRoomDto){
        try{
            const newChatRoom = await this.chatRepository.createChatRoom(createChatRoomDto);
            return{
                success: true,
                message: 'New Chat Room is created successfully'
            }
        }catch(error){
            console.error('Error in creating a new chat room: ', error.message);
            return{
                success: false,
                message: 'Failed to create a new chat room'
            }
        }
    }

    async createMessage(createMessageDto: CreateMessageDto, senderId: string){
        try{
            const newMessage = await this.chatRepository.createMessage(senderId, createMessageDto);
            return{
                success: true,
                message: newMessage.content
            }
        }catch(error){
            console.error('Error in creating a new Message');
            return{
                success: false,
                message: "Failed to create a new message"
            }
        }
    }

    async getAllMessagesOfChatRoom(chatRoomId: string){
        try{
            const messages = await this.chatRepository.getAllMessagesOfChatRoom(chatRoomId);
            return{
                success: true,
                message: 'All messages are fetched successfully',
                messages: messages
            }
        }catch(error){
            console.error('Error in fetching all the messages of the chat Room: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch all the messages of the chat room'
            }
        }
    }

    async getChatRoom(caseId: string){
        try{
            const chatRoom = await this.chatRepository.getChatRoom(caseId);
            return {
                success: true,
                message: 'Chat room is fetched successfully'
            }
        }catch(error){
            console.error('Error in fetching a chat Room');
            return{
                success: false,
                message: 'Failed to fetch a chat room'
            }
        }
    }
}