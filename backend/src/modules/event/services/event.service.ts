import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { EventRepository } from "../repositories/event.repository";
import { CreateEventDto } from "../dtos/createEvent.dto";
import { UpdateEventDto } from "../dtos/updateEvent.dto";

@Injectable()
export class EventService{
    constructor(
        private readonly eventRepository: EventRepository
    ){}

    async createNewEvent(createEventDto: Partial<CreateEventDto>): Promise<{success: boolean; message: string;}>{
        try{
            const newCase = await this.eventRepository.createNewEvent(createEventDto);
            if(newCase){
                return {
                    success: true,
                    message: 'New Event is created successfully',
                }
            }
            return{
                success: false,
                message: 'Failed to create a new event'
            }
        }catch(error){
            console.error('Error in creating a new Event: ', error.message);
            return{
                success: false,
                message: 'Failed to create a new event'
            }
        }
    }

    async updateEvent(caseId: string, updateEventDto: Partial<UpdateEventDto>){
        try{
            const result = await this.eventRepository.updateEvent(caseId, updateEventDto);
            if(result){
                return{
                    success: true,
                    message: 'Event is updated'
                }
            }
            return{
                success: false,
                message: 'Failed to update the Event'
            }
        }catch(error){
            console.error('Error in updating the Event: ', error.message);
            return{
                success: false,
                message: 'Failed to update the event'
            }
        }
    }

    async getAllEvents(): Promise<{success:boolean; message:string; events: Event[]|null}>{
        try{
            const events = await this.eventRepository.getAllEvents();
            return{
                success: true,
                message: '',
                events: events
            }
        }catch(error){
            console.error('Error in fetching all the events: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch all events',
                events: null
            }
        }
    }

    async deleteEvent(eventId: string): Promise<{success: boolean; message: string;}>{
        try{
            const result = await this.eventRepository.deleteEvent(eventId);
            if(result){
                return{
                    success: true,
                    message: 'Event is deleted'
                }
            }
            throw new Error('Failed to delete the event')
        }catch(error){
            console.error('Error in deleting the event: ', error.message);
            return{
                success: false,
                message: 'Failed to delete the event'
            }
        }
    }
}