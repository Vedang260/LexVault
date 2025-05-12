import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CaseCategory } from "src/common/enums/caseCategory.enums";
import { CasePriority } from "src/common/enums/casePriority.enums";
import { CaseStatus } from "src/common/enums/caseStatus.enums";

export class CreateCaseDto{
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    clientId: string;
}