import { DocumentType } from "../constants/documentType.enum";

export interface Tag {
  tagId: string;
  name: string;
  colorCode: string;
}

export interface Document {
  documentId: string;
  documentType: DocumentType;
  documentUrl: string;
  caseId: string;
  userId: string;
  title: string;
  description: string;
  version: number;
  uploadedAt: string;
  isConfidential: boolean;
  uploadedBy: {
    role: string;
    firstName?: string;
    lastName?: string;
  };
  tags: Tag[];
}

export interface GetAllDocumentsResponse{
    success: boolean;
    message: string;
    documents: Document[];
}

export interface GetAllTagResponse{
    success: boolean;
    message: string;
    tags: Tag[];
}

export interface CreateDocumentResponse{
    success: boolean;
    message: string;
}