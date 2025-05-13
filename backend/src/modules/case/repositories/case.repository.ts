import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Case } from "../entities/case.entity";
import { DataSource, In, Repository } from "typeorm";
import { CreateCaseDto } from "../dtos/createCase.dto";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { UpdateCaseDto } from "../dtos/updateCase.dto";
import { Lawyer } from "src/modules/lawyer/entities/lawyer.entity";

@Injectable()
export class CaseRepository{
    constructor(
        @InjectRepository(Case)
        private readonly caseRepository: Repository<Case>,

        private dataSource: DataSource
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

    async assignLawyers(caseId: string, lawyerIds: string[]) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Check if the case exists
            const caseResult = await queryRunner.query(
                `SELECT * FROM cases WHERE "caseId" = $1`,
                [caseId]
            );

            if (caseResult.length === 0) {
                throw new NotFoundException(`Case with ID ${caseId} not found`);
            }

            // 2. Check if all lawyers exist
            const lawyerResult = await queryRunner.query(
                `SELECT "lawyerId" FROM lawyer WHERE "lawyerId" = ANY($1::uuid[])`,
                [lawyerIds]
            );

            if (lawyerResult.length !== lawyerIds.length) {
                throw new NotFoundException(`Some lawyers were not found`);
            }

            // 3. Remove existing mappings (optional, if you want to replace)
            await queryRunner.query(
                `DELETE FROM case_assignedLawyers WHERE "caseId" = $1`,
                [caseId]
            );

            // 4. Insert new mappings
            for (const lawyerId of lawyerIds) {
                await queryRunner.query(
                `INSERT INTO case_assignedLawyers("caseId", "lawyerId") VALUES ($1, $2)`,
                [caseId, lawyerId]
                );
            }

            await queryRunner.commitTransaction();
            return { message: 'Lawyers assigned successfully' };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in assigning Lawyers to the case: ', error.message);
            throw new InternalServerErrorException('Error in assigning lawyer to the case');
        }finally {
            await queryRunner.release();
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