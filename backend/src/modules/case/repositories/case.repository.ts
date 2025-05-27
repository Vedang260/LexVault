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

    async assignLawyers(caseId: string, lawyerIds: string[]): Promise<boolean> {
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
                `DELETE FROM case_assignedlawyers WHERE "caseId" = $1`,
                [caseId]
            );

            // 4. Insert new mappings
            for (const lawyerId of lawyerIds) {
                await queryRunner.query(
                `INSERT INTO case_assignedlawyers("caseId", "lawyerId") VALUES ($1, $2)`,
                [caseId, lawyerId]
                );
            }

            await queryRunner.query(
                `UPDATE cases SET assigned = $2 WHERE "caseId" = $1`,
                [caseId, true]
            );

            await queryRunner.commitTransaction();
            return true;
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

    async updateCase(caseId: string, updateCasedto: Partial<UpdateCaseDto>): Promise<boolean>{
        try{
            const result = await this.caseRepository.update({caseId}, updateCasedto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating the case status: ', error.message);
            throw new InternalServerErrorException('Error in updating the case status');
        }
    }

    async getUnassignedCases() {
        try {
            return await this.caseRepository
            .createQueryBuilder('case')
            .leftJoinAndSelect('case.client', 'client')
            .select([
                'case.caseId',
                'case.description',
                'case.assigned',
                'client.firstName',
                'client.lastName'
            ])
            .where('case.assigned = :assigned', { assigned: false })
            .orderBy('case.createdAt', 'DESC')
            .getMany();
        } catch (error) {
            console.error('Error fetching unassigned cases:', error.message);
            throw new InternalServerErrorException('Unable to fetch unassigned cases');
        }
    }

    async getAssignedCasesOfLawyer(userId: string){
        try{
            return await this.caseRepository
                .createQueryBuilder('case')
                .leftJoin('case.lawyer', 'lawyer')
                .leftJoin('lawyer.user', 'user')
                .where('user.id = :userId', { userId })
                .getMany();
        }catch(error){
            console.error('Error in fetching assigned cases of Lawyers: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the assigned cases of Lawyers');
        }
    }

    async getAssignedCasesOfLawyerDashboard(userId: string) {
        try {
            return await this.caseRepository
            .createQueryBuilder('case')
            .leftJoin('case.assignedLawyers', 'lawyer')
            .leftJoin('users', 'user', 'user.userId = lawyer.userId') // explicit join
            .where('user.userId = :userId', { userId }) // updated condition
            .getMany();
        } catch (error) {
            console.error('Error in fetching assigned cases of Lawyers: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the assigned cases of Lawyers');
        }
    }


}