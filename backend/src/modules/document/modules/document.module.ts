import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from '../controllers/document.controller';
import { DocumentRepository } from '../repositories/document.repository';
import { DocumentService } from '../services/document.service';
import { Document } from '../entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository],
  exports: [DocumentService, DocumentRepository],
})
export class DocumentModule {} 