import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";
import { EventService } from "../services/event.service";
import { CreateEventDto } from "../dtos/createEvent.dto";
import { UpdateEventDto } from "../dtos/updateEvent.dto";

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController{
    constructor(
        private readonly eventService: EventService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async createNewEvent(@Body() createEventDto: CreateEventDto){
        return await this.eventService.createNewEvent(createEventDto);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async updateEvent(@Param('id') eventId: string, @Body() updateEventDto: UpdateEventDto){
        return await this.eventService.updateEvent(eventId, updateEventDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async deleteEvent(@Param('id') eventId: string){
        return await this.eventService.deleteEvent(eventId);
    }

    @Get('/case/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async getAllEventsByCase(@Param('id') caseId: string){
        return await this.eventService.getCaseEvents(caseId);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async getAllEvents(){
        return await this.eventService.getAllEvents();
    }
}