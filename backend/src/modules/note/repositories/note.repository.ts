import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "../entities/note.entity";
import { CreateNoteDto } from "../dtos/createNote.dto";
import { UpdateNoteDto } from "../dtos/updateNote.dto";

@Injectable()
export class NoteRepository{
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>
    ){}

    async createNote(userId: string, createNoteDto: CreateNoteDto): Promise<Note|null>{
        try{
            const newNote = this.noteRepository.create({ ...createNoteDto, userId });
            return await this.noteRepository.save(newNote);
        }catch(error){
            console.error('Error in creating a new Note: ', error.message);
            throw new InternalServerErrorException('Error in creating a new Note');
        }
    }

    async updateNote(noteId: string, updateNoteDto: Partial<UpdateNoteDto>): Promise<boolean>{
        try{
            const result = await this.noteRepository.update({noteId}, updateNoteDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating Note: ', error.message);
            throw new InternalServerErrorException('Error in updating Note');
        }
    }
    async deleteNote(noteId: string): Promise<boolean>{
        try{
            const result = await this.noteRepository.delete({noteId});
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting Note: ', error.message);
            throw new InternalServerErrorException('Error in deleting Note');
        }
    }

    async getCaseNotes(caseId: string): Promise<Note[]>{
        try{
            return await this.noteRepository.find({
                where: {caseId}
            });
        }catch(error){
            console.error('Error in fetching Notes: ', error.message);
            throw new InternalServerErrorException('Error in fetching Notes');
        }
    }
}