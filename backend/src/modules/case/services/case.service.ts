import { Injectable } from "@nestjs/common";
import { CaseRepository } from "../repositories/case.repository";
import { CreateCaseDto } from "../dtos/createCase.dto";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { UpdateCaseDto } from "../dtos/updateCase.dto";

@Injectable()
export class CaseService{
    constructor(
        private readonly caseRepository: CaseRepository
    ){}

    async createNewCase(clientId: string, createCaseDto: Partial<CreateCaseDto>): Promise<{success: boolean; message: string;}>{
        try{
            const newCreateCaseDto : Partial<CreateCaseDto> = {
                ...createCaseDto,
                clientId
            };

            const newCase = await this.caseRepository.createNewCase(newCreateCaseDto);
            if(newCase){
                return {
                    success: true,
                    message: 'New Case is created successfully',
                }
            }
            return{
                success: false,
                message: 'Failed to create a new case'
            }
        }catch(error){
            console.error('Error in creating a new Case: ', error.message);
            return{
                success: false,
                message: 'Failed to create a new case'
            }
        }
    }

    async updateCaseStatus(caseId: string, updateCaseDto: UpdateCaseDto){
        try{
            const result = await this.caseRepository.updateCase(caseId, updateCaseDto);
            if(result){
                return{
                    success: true,
                    message: 'Case status is updated'
                }
            }
            return{
                success: false,
                message: 'Failed to update the case Status'
            }
        }catch(error){
            console.error('Error in updating the case status: ', error.message);
            return{
                success: false,
                message: 'Failed to update the case status'
            }
        }
    }
}