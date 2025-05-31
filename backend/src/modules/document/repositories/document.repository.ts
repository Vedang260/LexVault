import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, Repository } from "typeorm";
import { CreateDocumentDto } from "../dtos/createDocument.dto";
import { Document } from "../entities/document.entity";
import { DataSource } from 'typeorm';
import { Tag } from "src/modules/tags/entities/tag.entity";

@Injectable()
export class DocumentRepository{
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        private dataSource: DataSource
    ){}

    async createNewDocument(tags: Tag[], createDocumentDto: Partial<CreateDocumentDto>): Promise<Document>{
        try{
            const newDocument = this.documentRepository.create(createDocumentDto);
            const document = await this.documentRepository.save(newDocument);

            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into('document_tags')
                .values(tags.map((tag: Tag) => ({
                    documentId: document.documentId,
                    tagId: tag.tagId,
                })))
                .execute();
            return document;
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

    async getCaseRelatedDocuments(caseId: string): Promise<any[]> {
        try {
            const documents = await this.documentRepository.createQueryBuilder('document')
                .leftJoinAndSelect('document.tags', 'tag')
                .leftJoin('document.uploadedBy', 'user')
                .addSelect(['user.role']) // Only select the role
                .where('document.caseId = :caseId', { caseId })
                .getMany();

            return documents.map(doc => ({
                ...doc,
                uploadedBy: { role: doc['uploadedBy']?.role }
            }));
        } catch (error) {
            console.error('Error in fetching case related documents: ', error.message);
            throw new InternalServerErrorException('Error in fetching case related documents');
        }
    }


    async getDocumentsOfClient(userId: string, caseId: string){
        try{
            return await this.documentRepository.find({
                where: { userId, caseId },
                relations: ['tags']
            });
        }catch(error){
            console.error('Error in fetching case related documents: ', error.message);
            throw new InternalServerErrorException('Error in fetching case related documents');
        }
    }
}