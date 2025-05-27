import { Injectable } from "@nestjs/common";
import { DocumentRepository } from "../repositories/document.repository";
import { CreateDocumentDto } from "../dtos/createDocument.dto";

@Injectable()
export class DocumentService{
    constructor(
        private readonly documentRepository: DocumentRepository
    ){}

    async createDocument(userId: string, documentDto: Partial<CreateDocumentDto>){
        try{
            const newDocumentDto : Partial<CreateDocumentDto> = {
                ...documentDto,
                userId: userId
            }
            const newDocument = await this.documentRepository.createNewDocument(newDocumentDto);
            if(newDocument){
                return{
                    success: true,
                    message: 'New Document is created successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to create a new Document'
            }
        }catch(error){
            console.error('Failed to create a new Document: ', error.message);
            return{
                success: false,
                message: 'Failed to create a new Document'
            }
        }
    }

    async deleteDocument(documentId: string){
        try{
            const result = await this.documentRepository.deleteDocument(documentId);
            if(result){
                return{
                    success: true,
                    message: 'Document is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete a document'
            }
        }catch(error){
            console.error('Error in deleting the document: ', error.message);
            return{
                success: false,
                message: 'Failed to delete document'
            }
        }
    }

    async getCaseRelatedDocuments(caseId: string){
        try{
            const documents = await this.documentRepository.getCaseRelatedDocuments(caseId);
            if(documents){
                return {
                    success: true,
                    message: 'All documents are fetched successfully',
                    documents: documents
                }
            }
            return{
                success: false,
                message: 'Failed to fetch the documents'
            }
        }catch(error){
            console.error('Error in fetching the case realted documents: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the documents'
            }
        }
    }

    async getDocumentsOfClient(userId: string, caseId: string){
        try{
            const documents = await this.documentRepository.getDocumentsOfClient(userId, caseId);
            return {
                success: true,
                message: 'All documents are fetched successfully'
            }
        }catch(error){
            console.error('Error in fetching the case realted documents uploaded by client: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the documents'
            }
        }
    }
}