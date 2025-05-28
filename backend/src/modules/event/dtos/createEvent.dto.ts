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
    eventDate: Date;

    @IsNotEmpty()
    eventTime: string;

    @IsNotEmpty()
    type: EventType;
}