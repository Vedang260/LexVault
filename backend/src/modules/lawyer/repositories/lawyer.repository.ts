import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserRole } from 'src/common/enums/roles.enums';
import { Lawyer } from '../entities/lawyer.entity';
import { CreateLawyerDto } from '../dtos/createLawyer.dto';

@Injectable()
export class LawyerRepository{
    constructor(
        @InjectRepository(Lawyer)
        private readonly lawyerRepository: Repository<Lawyer>,
    ) {}        

    // creates new lawyer
    async createLawyer(createLawyerDto: Partial<CreateLawyerDto>): Promise<Lawyer> {
        try{
            const lawyer = this.lawyerRepository.create(createLawyerDto);
            return this.lawyerRepository.save(lawyer);
        }catch(error){
            console.error('Error in creating new lawyer ', error.message);
            throw new InternalServerErrorException('Error in creating new lawyer');
        }
    }

    // deletes a user
    async deleteLawyer(id: string): Promise<boolean> {
        try{
            const result = await this.lawyerRepository.delete(id);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a lawyer ', error.message);
            throw new InternalServerErrorException('Error in deleting a lawyer');
        }
    }
}