import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, Repository } from "typeorm";
import { CreateDocumentDto } from "../dtos/createDocument.dto";
import { Document } from "../entities/document.entity";

@Injectable()
export class DocumentRepository{
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>
    ){}

    async createNewDocument(createDocumentDto: Partial<CreateDocumentDto>): Promise<Document>{
        try{
            const newDocument = this.documentRepository.create(createDocumentDto);
            return await this.documentRepository.save(newDocument);
        }catch(error){
            console.error('Error in creating a new Document: ', error.message);
            throw new InternalServerErrorException('Error in creating a new Document');
        }
    }

    async deleteDocument(documentId: string): Promise<boolean>{
        try{
            const result = await this.documentRepository.delete(documentId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a Document: ', error.message);
            throw new InternalServerErrorException('Error in deleting a Document');
        }
    }

    async getCaseRelatedDocuments(caseId: string): Promise<Document[]>{
        try{
            return await this.documentRepository.find({
                where: {caseId}
            });
        }catch(error){
            console.error('Error in fetching case related documents: ', error.message);
            throw new InternalServerErrorException('Error in fetching case related documents');
        }
    }

    async getDocumentsOfClient(userId: string, caseId: string){
        try{
            return await this.documentRepository.find({
                where: { userId, caseId }
            });
        }catch(error){
            console.error('Error in fetching case related documents: ', error.message);
            throw new InternalServerErrorException('Error in fetching case related documents');
        }
    }
}