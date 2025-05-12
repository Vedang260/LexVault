import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '../../../config/cloudinary.config';
import { UploadService } from '../services/upload.service';
import { UploadController } from '../controllers/upload.controller';
@Module({
    controllers: [UploadController],
    providers: [CloudinaryProvider, UploadService],
    exports: [UploadService],
})
export class UploadModule {}