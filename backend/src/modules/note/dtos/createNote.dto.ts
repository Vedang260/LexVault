import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    caseId: string;
}