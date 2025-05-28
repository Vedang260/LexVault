import { Injectable } from "@nestjs/common";
import { ChatRepository } from "../repositories/chat.repository";

@Injectable()
export class ChatService{
    constructor(
        private chatRepository: ChatRepository
    ){}

    async createChatRoom(){

    }

    async createMessage(){
        try{

        }catch(error){

        }
    }

    async getAllMessagesOfChatRoom(){
        try{

        }catch(error){

        }
    }

    async getChatRoom(){
        try{

        }catch(error){
            
        }
    }
}