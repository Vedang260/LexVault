import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    colorCode: string;
}