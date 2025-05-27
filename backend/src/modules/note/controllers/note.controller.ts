import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { NoteService } from "../services/note.service";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";
import { CreateNoteDto } from "../dtos/createNote.dto";
import { UpdateNoteDto } from "../dtos/updateNote.dto";

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NoteController{
    constructor(
        private readonly noteService: NoteService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.LAWYER)
    async createNewNote(@Req() req: Request, @Body() createNoteDto: CreateNoteDto){
        return await this.noteService.createNewNote(req['user'].userId, createNoteDto);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.LAWYER)
    async updateNote(@Param('id') noteId: string, @Body() updateNoteDto: Partial<UpdateNoteDto>){
        return await this.noteService.updateNote(noteId, updateNoteDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async deleteNote(@Param('id') noteId: string){
        return await this.noteService.deleteNote(noteId);
    }

    @Get('/case/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.LAWYER)
    async getAllNotes(@Param('id') caseId: string){
        return await this.noteService.getAllNotes(caseId);
    }
}