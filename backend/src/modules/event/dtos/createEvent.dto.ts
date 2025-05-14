import { IsNotEmpty, IsString } from "class-validator";
import { EventType } from "src/common/enums/eventType.enums";

export class CreateEventDto{
    @IsNotEmpty()
    @IsString()
    caseId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    start: Date;

    @IsNotEmpty()
    end: Date;

    @IsNotEmpty()
    type: EventType;
}