import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Case } from "../entities/case.entity";
import { Repository } from "typeorm";
import { CreateCaseDto } from "../dtos/createCase.dto";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { UpdateCaseDto } from "../dtos/updateCase.dto";

@Injectable()
export class CaseRepository{
    constructor(
        @InjectRepository(Case)
        private readonly caseRepository: Repository<Case>,
    ) {}
    
    async createNewCase(createCaseDto: Partial<CreateCaseDto>): Promise<Case|null>{
        try{
            const newCase = this.caseRepository.create(createCaseDto);
            return await this.caseRepository.save(newCase);
        }catch(error){
            console.error('Error in creating new case: ', error.message);
            throw new InternalServerErrorException('Error in creating a new Case');
        }
    }

    async assignLawyers(caseId: string, lawyerIds: string[]){
        try{

        }catch(error){
            console.error('Error in assigning Lawyers to the case: ', error.message);
            throw new InternalServerErrorException('Error in assigning lawyer to the case');
        }
    }

    async getAllCases(){
        try{

        }catch(error){

        }
    }

    async getCaseDetails(){
        try{

        }catch(error){
            console.error('Error in fetching the case details: ', error.message);
            throw new InternalServerErrorException('Error in fetching the case details: ', error.message);
        }
    }

    async updateCase(caseId: string, updateCasedto: UpdateCaseDto): Promise<boolean>{
        try{
            const result = await this.caseRepository.update({caseId}, updateCasedto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating the case status: ', error.message);
            throw new InternalServerErrorException('Error in updating the case status');
        }
    }
}