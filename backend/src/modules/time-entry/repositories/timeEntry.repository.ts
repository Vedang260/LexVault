import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimeEntry } from "../entities/timeEntry.entity";
import { Repository } from "typeorm";
import { CreateTimeEntryDto } from "../dtos/createTimeEntry.dto";

@Injectable()
export class TimeEntryRepository{
    constructor(
        @InjectRepository(TimeEntry)
        private readonly timeEntryRepository: Repository<TimeEntry>
    ){}

    async createNewEntry(userId: string, createTimeEntryDto: Partial<CreateTimeEntryDto>){
        try{
            const newTimeEntry = this.timeEntryRepository.create({...createTimeEntryDto, userId});
            return await this.timeEntryRepository.save(newTimeEntry);
        }catch(error){
            console.error('Error in creating a new Time Entry: ', error.message);
            throw new InternalServerErrorException('Error in fetching the time entries of the case');
        }
    }

    async getAllTimeEntriesByCase(caseId: string){
        try{

        }catch(error){
            console.error('Error in fetching the time entries of case: ', error.message);
            throw new InternalServerErrorException('Error in fetching the time entries of the case');
        }
    }

    // async updateTimeEntries(timeEntryId: string, ){
    //     try{

    //     }catch(error){
    //         console.error('Error in updating the time entries: ', error.message);
    //         throw new InternalServerErrorException('Error in updating the time entries of the case');
    //     }
    // }

    async deleteTimeEntry(timeEntryId: string){
        try{
            const result = await this.timeEntryRepository.delete({
                timeEntryId
            });
            return result.affected ? result.affected>0 : false;
        }catch(error){
            console.error('Error in deleting a time entry: ', error.message);
            throw new InternalServerErrorException('Error in deleting the time entry');
        }
    }
}