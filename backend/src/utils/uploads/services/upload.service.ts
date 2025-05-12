import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadPDF(
    file: Express.Multer.File,
    folder: string = 'legal_documents'
  ): Promise<{
    success: boolean;
    message: string;
    url?: string;
    publicId?: string;
    error?: string;
  }> {
    return new Promise((resolve) => {
      if (!file) {
        resolve({
          success: false,
          message: 'No file provided',
          error: 'FILE_MISSING'
        });
        return;
      }

      if (file.mimetype !== 'application/pdf') {
        resolve({
          success: false,
          message: 'Only PDF files are allowed',
          error: 'INVALID_FILE_TYPE'
        });
        return;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          format: 'pdf',
          folder,
          tags: ['legal_document'] // Optional tagging for organization
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve({
              success: false,
              message: 'Failed to upload document',
              error: error.message
            });
          } else if (!result) {
            resolve({
              success: false,
              message: 'Cloudinary returned no response',
              error: 'NO_RESULT'
            });
          } else {
            resolve({
              success: true,
              message: 'PDF uploaded successfully',
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  async deletePDF(publicId: string): Promise<{ success: boolean; message: string }> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      return { success: true, message: 'PDF deleted successfully' };
    } catch (error) {
      console.error('Error deleting PDF:', error);
      return { success: false, message: 'Failed to delete PDF' };
    }
  }

  async getSecureUrl(publicId: string): Promise<string> {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true,
      sign_url: true, // For added security
      expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiration
    });
  }
}