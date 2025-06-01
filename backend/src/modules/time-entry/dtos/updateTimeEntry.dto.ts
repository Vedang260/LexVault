import { IsOptional } from "class-validator";

export class UpdateTimeEntryDto{

    @IsOptional()
    date: string

    @IsOptional()
    startTime: Date;

    @IsOptional()
    endTime: Date;

    @IsOptional()
    duration: number; 

    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    billable: boolean;

    @IsOptional()
    billed: boolean;
}