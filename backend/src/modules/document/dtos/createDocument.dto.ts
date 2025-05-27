import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DocumentType } from "src/common/enums/documentType.enums";

export class CreateDocumentDto{

    @IsNotEmpty()
    documentType: DocumentType;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    documentUrl: string;

    @IsString()
    @IsNotEmpty()
    caseId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsOptional()
    isConfidential: boolean; 
}