import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto{
    @IsNotEmpty()
    @IsString()
    chatRoomId: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}