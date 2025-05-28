import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTimeEntryDto{
    @IsNotEmpty()
    caseId: string;

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date;

    @IsNotEmpty()
    duration: number; 

    @IsNotEmpty()
    title: string;

    @IsOptional()
    billable: boolean;

    @IsOptional()
    billed: boolean;
}