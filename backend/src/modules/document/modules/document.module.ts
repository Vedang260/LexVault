import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from '../controllers/document.controller';
import { DocumentRepository } from '../repositories/document.repository';
import { DocumentService } from '../services/document.service';
import { Document } from '../entities/document.entity';
import { TagModule } from 'src/modules/tags/modules/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), TagModule],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository],
  exports: [DocumentService, DocumentRepository],
})
export class DocumentModule {} 