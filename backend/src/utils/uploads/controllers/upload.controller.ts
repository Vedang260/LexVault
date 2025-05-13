import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('license')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLicense(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadPDF(file, 'lawyer_licenses');
  }

  @Post('document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocuments(@UploadedFile() file: Express.Multer.File){
    return this.uploadService.uploadPDF(file, 'documents');
  }
}