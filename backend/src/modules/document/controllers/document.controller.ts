import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";
import { DocumentService } from "../services/document.service";
import { CreateDocumentDto } from "../dtos/createDocument.dto";

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentController{
    constructor(
        private readonly documentService: DocumentService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.LAWYER, UserRole.ADMIN)
    async createNewDocument(@Req() req: Request, @Body() createDocumentDto: Partial<CreateDocumentDto>){
        return await this.documentService.createDocument(req['user'].userId, createDocumentDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async deleteDocument(@Param('id') documentId: string){
        return await this.documentService.deleteDocument(documentId);
    }

    @Get('/client/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.CLIENT, UserRole.LAWYER)
    async getClientDocuments(@Req() req: Request, @Param('id') caseId: string){
        return await this.documentService.getDocumentsOfClient(req['user'].userId, caseId);
    }

    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async getAllDocumnetsRealtedToCase(@Param('id') caseId: string){
        return await this.documentService.getCaseRelatedDocuments(caseId);
    }

}