import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTimeEntryDto{
    @IsNotEmpty()
    caseId: string;

    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date;

    @IsNotEmpty()
    duration: number; 

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    billable: boolean;

    @IsOptional()
    billed: boolean;
}