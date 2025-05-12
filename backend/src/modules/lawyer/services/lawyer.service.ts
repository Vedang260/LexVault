import { Injectable, NotFoundException } from '@nestjs/common';
import { LawyerRepository } from '../repositories/lawyer.repository';
import { CreateLawyerDto } from '../dtos/createLawyer.dto';
import { Lawyer } from '../entities/lawyer.entity';

@Injectable()
export class LawyerService {
  constructor(private readonly lawyerRepository: LawyerRepository) {}

  async findLawyerRequests(): Promise<{ success: boolean; message: string; lawyers?: Lawyer[] | null }> {
    try{
      const lawyers = await this.lawyerRepository.getAllLawyerRequests();
      return {
        success: true,
        message: 'All lawyer requests are retrieved successfully',
        lawyers: lawyers
      }
    }catch(error){
      console.error('Error in fetching all the lawyer request: ', error.message);
      return {
        success: false,
        message: 'Internal Server Error'
      }
    }
  }

  async verifyLawyer(lawyerId: string): Promise<{ success: boolean, message: string}>{
    try{
        // check if a lawyer exists
        const lawyer = await this.lawyerRepository.findOneLawyer(lawyerId);
        if(lawyer){
            await this.lawyerRepository.verifyLawyer(lawyerId);
            return{
              success: true,
              message: 'Lawyer is verified'
            }
        }
        return{
            success: false,
            message: 'Lawyer does not exist'
        }
    }catch(error){
        console.error('Error in verifying a lawyer: ', error.message);
        return{
            success: false,
            message: 'Failed to verify a lawyer'
        }
    }
  }

  async removeLawyer(id: string): Promise<{ success: boolean, message: string}> {
    try{
      const result = await this.lawyerRepository.deleteLawyer(id);
    
    if (!result) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return{
      success: true,
      message: 'User is deleted'
    }
    }catch(error){
       console.error('Error in deleting the user');
       return{
        success: false,
        message: 'User is deleted successfully'
       }
    }
  }
} 