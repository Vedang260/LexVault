import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CaseRepository } from "../repositories/case.repository";
import { CreateCaseDto } from "../dtos/createCase.dto";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { UpdateCaseDto } from "../dtos/updateCase.dto";
import { Case } from "../entities/case.entity";

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

    async updateCaseStatus(caseId: string, updateCaseDto: Partial<UpdateCaseDto>){
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

    async getUnassignedCases(): Promise<{success:boolean; message:string; cases: Case[]|null}>{
        try{
            const cases = await this.caseRepository.getUnassignedCases();
            return{
                success: true,
                message: 'Unassigned cases are fetched',
                cases: cases
            }
        }catch(error){
            console.error('Error in fetching un-assigned cases: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch unasigned cases',
                cases: null
            }
        }
    }

    async assignLawyers(caseId: string, lawyerIds: string[]){
        try{
            const result = await this.caseRepository.assignLawyers(caseId, lawyerIds);
            if(result){
                return{
                    success: true,
                    message: 'Lawyer is assigned'
                }
            }
            throw new Error('Unable to assign the Lawyer');
        }catch(error){
            console.error('Error in assigning case to the Lawyer: ', error.message);
            return{
                success: false,
                message: 'Failed to assign case to Lawyer'
            }
        }
    }

    async getAssignedCaseOfLawyerDashboard(userId: string){
        try{
            const cases = await this.caseRepository.getAssignedCasesOfLawyerDashboard(userId);
            if(cases){
                return{
                    success: true,
                    message: 'Your cases are arrived successfully',
                    cases: cases
                }
            }
            return{
                success: false,
                message: 'Failed to fetch your assigned cases'
            }
        }catch(error){
            console.error('Error in assigning case to the Lawyer: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch your assugned cases'
            }
        }
    }

    async getCaseDetails(caseId: string){
        try{
            const caseDetails = await this.caseRepository.getCaseDetails(caseId);
            if(caseDetails){
                return{
                    success: true,
                    message: 'Your case details are fetched',
                    caseDetails: caseDetails
                }
            }
        }catch(error){
            console.error('Error in fetching the case details: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch case details'
            }
        }
    }

    async getClientInfo(){
        try{

        }catch(error){

        }
    }

    async getClientCases(clientId: string){
        try{
            const cases = await this.caseRepository.getClientCases(clientId);
            if(cases){
                return{
                    success: true,
                    message: 'Your cases are arrived successfully',
                    cases: cases
                }
            }
            return{
                success: false,
                message: 'Failed to fetch your assigned cases'
            }
        }catch(error){
            console.error('Error in fetching the client cases: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the client cases',
                cases: null
            }
        }
    }
}