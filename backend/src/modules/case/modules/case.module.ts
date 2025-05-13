import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from '../entities/case.entity';
import { CaseService } from '../services/case.service';
import { CaseRepository } from '../repositories/case.repository';
import { CaseController } from '../controllers/case.controller';
import { LawyerRepository } from 'src/modules/lawyer/repositories/lawyer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Case])],
  controllers: [CaseController],
  providers: [CaseService, CaseRepository],
  exports: [CaseService, CaseRepository],
})
export class CaseModule {} 