import { Injectable } from "@nestjs/common";
import { TimeEntryRepository } from "../repositories/timeEntry.repository";
import { CreateTimeEntryDto } from "../dtos/createTimeEntry.dto";
import { UpdateTimeEntryDto } from "../dtos/updateTimeEntry.dto";

@Injectable()
export class TimeEntryService{
    constructor(
        private readonly timeEntryRepository: TimeEntryRepository
    ){}

    async createTimeEntry(userId: string, createTimeEntryDto: Partial<CreateTimeEntryDto>){
        try{
            const newTimeEntry = await this.timeEntryRepository.createNewEntry(userId, createTimeEntryDto);
            return {
                success: true,
                message: 'New Time Entry is created successfully'
            }
        }catch(error){
            console.error('Error in creating a new Time Entry: ', error.message);
            return{
                success: false,
                message: 'Failed to create a new Time Entry'
            }
        }
    }

    async getAllTimeEntriesByCase(caseId: string){
        try{
            const timeEntries = await this.timeEntryRepository.getAllTimeEntriesByCase(caseId);
            return{
                success: true,
                message: 'All Time Entries are fetched successfully',
                timeEntries: timeEntries
            }
        }catch(error){
            console.error('Error in fetching all the time entries of case: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the time entries of case',
                timeEntries: []
            }
        }
    }

    async deleteTimeEntry(timeEntryId: string){
        try{
            const result = await this.timeEntryRepository.deleteTimeEntry(timeEntryId);
            return{
                success: true,
                message: 'Time Entry is deleted successfully'
            }
        }catch(error){
            console.error('Error in deleting the time entry: ', error.message);
            return{
                success: false,
                message: 'Failed to delete a time entry'
            }
        }
    }

    async updateTimeEntry(timeEntryId: string, updateTimeEntryDto: UpdateTimeEntryDto){
        try{
            const result = await this.timeEntryRepository.updateTimeEntry(timeEntryId, updateTimeEntryDto);
            return{
                success: true,
                message: 'Time Entry is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the time entry: ', error.message);
            return{
                success: false,
                message: 'Failed to update a time entry'
            }
        }
    }
}