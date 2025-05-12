import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lawyer } from '../entities/lawyer.entity';
import { LawyerService } from '../services/lawyer.service';
import { LawyerRepository } from '../repositories/lawyer.repository';
import { LawyerController } from '../controllers/lawyer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lawyer])],
  controllers: [LawyerController],
  providers: [LawyerService, LawyerRepository],
  exports: [LawyerService, LawyerRepository],
})
export class LawyerModule {} 