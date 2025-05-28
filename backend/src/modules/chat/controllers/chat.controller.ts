import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { ChatService } from "../services/chat.service";
import { UserRole } from "src/common/enums/roles.enums";
import { Roles } from "src/common/decorators/roles.decorators";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateChatRoomDto } from "../dtos/createChatRoom.dto";

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController{
    constructor(
        private readonly chatService: ChatService
    ){}

    @Post('create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async createNewChatRoom(@Body() createChatRoomDto: CreateChatRoomDto){
        return await this.chatService.createChatRoom(createChatRoomDto);
    }

    @Get(':id/messages')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.CLIENT, UserRole.LAWYER)
    async getAllMessagesOfChatRoom(@Param('id') chatRoomId: string){
        return await this.chatService.getAllMessagesOfChatRoom(chatRoomId);
    }

    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.CLIENT, UserRole.LAWYER)
    async getChatRoom(@Param('id') caseId: string){
        return await this.chatService.getChatRoom(caseId);
    }

}