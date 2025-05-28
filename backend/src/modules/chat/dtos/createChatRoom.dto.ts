import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatRoomDto{
    @IsNotEmpty()
    @IsString()
    caseId: string;

    @IsNotEmpty()
    memberIds: string[];   
}