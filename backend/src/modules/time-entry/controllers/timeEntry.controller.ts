import { Body, Controller, Delete, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { TimeEntryService } from "../services/timeEntry.service";
import { CreateTimeEntryDto } from "../dtos/createTimeEntry.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";

@Controller('time-entry')
@UseGuards(JwtAuthGuard)
export class TimeEntryController{
    constructor(
        private readonly timeEntryService: TimeEntryService
    ){}

    @Post('create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async createNewEntry(@Req() req: Request, @Body() createNewTimeEntryDto: CreateTimeEntryDto){
        return await this.timeEntryService.createTimeEntry(req['user'].userId, createNewTimeEntryDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async deleteTimeEntry(@Param('id') timeEntryId: string){
        return await this.timeEntryService.deleteTimeEntry(timeEntryId);
    }
}