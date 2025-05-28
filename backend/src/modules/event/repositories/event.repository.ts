import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "../dtos/createEvent.dto";
import { UpdateEventDto } from "../dtos/updateEvent.dto";
import { Event as CaseEvent} from "../entities/event.entity";

@Injectable()
export class EventRepository{
    constructor(
        @InjectRepository(CaseEvent)
        private readonly eventRepository: Repository<CaseEvent>
    ){}

    async createNewEvent(createEventDto: Partial<CreateEventDto>): Promise<CaseEvent|null>{
        try{
            const newEvent = this.eventRepository.create(createEventDto);
            return await this.eventRepository.save(newEvent);
        }catch(error){
            console.error('Error in creating a new Event: ', error.message);
            throw new InternalServerErrorException('Error in creating a new Event');
        }
    }

    async updateEvent(eventId: string, updateEventDto: Partial<UpdateEventDto>): Promise<boolean>{
        try{
            const result = await this.eventRepository
                        .createQueryBuilder()
                        .update(CaseEvent)
                        .set(updateEventDto)
                        .where("eventId = :eventId", { eventId })
                        .execute();

            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating Event: ', error.message);
            throw new InternalServerErrorException('Error in updating Event');
        }
    }

    async getAllEventsByCase(caseId: string): Promise<CaseEvent[]>{
        try{
            return await this.eventRepository
                        .createQueryBuilder("event")
                        .where("event.caseId = :caseId", { caseId })
                        .getMany();
        }catch(error){
            console.error('Error in fetching all the Events of a Case: ', error.message);
            throw new InternalServerErrorException('Error in fetching all the Events of a Case');
        }
    }

    async deleteEvent(eventId: string): Promise<boolean>{
        try{
            const result = await this.eventRepository.delete(eventId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting an Event: ', error.message);
            throw new InternalServerErrorException('Error in deleting an Event');
        }
    }

    async getAllEvents(): Promise<CaseEvent[]>{
        try{
            return await this.eventRepository.find();
        }catch(error){
            console.error('Error in fetching all the events: ', error.message);
            throw new InternalServerErrorException('Error in fetching all the events');
        }
    }
}