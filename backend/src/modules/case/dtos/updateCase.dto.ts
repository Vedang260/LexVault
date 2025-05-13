import { IsOptional, IsString } from "class-validator";
import { CaseCategory } from "src/common/enums/caseCategory.enums";
import { CasePriority } from "src/common/enums/casePriority.enums";
import { CaseStatus } from "src/common/enums/caseStatus.enums";

export class UpdateCaseDto{
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    caseNumber: string;

    @IsOptional()
    status: CaseStatus;

    @IsOptional()
    category: CaseCategory;

    @IsOptional()
    priority: CasePriority;
    
    @IsOptional()
    openedDate: Date;

    @IsOptional()
    closedDate: Date;

    @IsOptional()
    expectedResolutionDate: Date;

    @IsOptional()
    courtName: string;

    @IsOptional()
    courtCaseNumber: string;
}