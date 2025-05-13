import { IsNotEmpty, IsString } from "class-validator";

export class CreateCaseDto{
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    clientId: string;
}