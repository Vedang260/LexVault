import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CaseCategory } from "src/common/enums/caseCategory.enums";
import { CasePriority } from "src/common/enums/casePriority.enums";
import { CaseStatus } from "src/common/enums/caseStatus.enums";

export class CreateCaseDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    caseNumber: string;

    @IsEnum(CaseStatus)
    @IsOptional()
    status?: CaseStatus;

    @IsEnum(CaseCategory)
    @IsNotEmpty()
    category: CaseCategory;

    @IsEnum(CasePriority)
    @IsOptional()
    priority?: CasePriority;

    @IsDateString()
    openedDate: Date;

    @IsDateString()
    @IsOptional()
    closedDate?: Date;

    @IsDateString()
    @IsOptional()
    expectedResolutionDate?: Date;

    @IsString()
    @IsOptional()
    courtName?: string;

    @IsString()
    @IsOptional()
    courtCaseNumber?: string;

    @IsString()
    @IsNotEmpty()
    clientId: string;
}