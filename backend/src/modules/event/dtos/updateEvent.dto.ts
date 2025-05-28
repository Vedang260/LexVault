import { IsOptional, IsString } from "class-validator";
import { CreateEventDto } from "./createEvent.dto";
import { EventType } from "src/common/enums/eventType.enums";

export class UpdateEventDto{

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    eventDate: Date;

    @IsOptional()
    eventTime: string;

    @IsOptional()
    type: EventType;
} 