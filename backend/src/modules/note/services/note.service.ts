import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNoteDto } from "../dtos/createNote.dto";
import { NoteRepository } from "../repositories/note.repository";
import { UpdateNoteDto } from "../dtos/updateNote.dto";
import { Note } from "../entities/note.entity";

@Injectable()
export class NoteService{
    constructor(
        private readonly noteRepository: NoteRepository
    ){}

    async createNewNote(userId: string, createNoteDto: CreateNoteDto): Promise<{ success: boolean; message: string;}>{
        try{
            const newNote = await this.noteRepository.createNote(userId, createNoteDto);
            if(newNote){
                return{
                    success: true,
                    message: 'New Note is created'
                }
            }
            return{
                success: false,
                message: 'Failed to create a new Note'
            }
        }catch(error){
            console.error('Error in creating a new note: ', error.message);
            return{
                success: false,
                message: 'Failed to created a new Note'
            }
        }
    }

    async updateNote(noteId: string, updateNoteDto: Partial<UpdateNoteDto>): Promise<{ success: boolean; message: string;}>{
        try{
            const result = await this.noteRepository.updateNote(noteId, updateNoteDto);
            if(result){
                return{
                    success: true,
                    message: 'Note is updated'
                }
            }
            throw new NotFoundException('Failed to update note');
        }catch(error){
            console.error('Error in updating a note: ', error.message);
            return{
                success: false,
                message: 'Failed to update a tag'
            }
        }
    }

    async deleteNote(noteId: string): Promise<{ success: boolean; message: string;}>{
        try{
            const result = await this.noteRepository.deleteNote(noteId);
            if(result){
                return{
                    success: true,
                    message: 'Note is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete a Note'
            }
        }catch(error){
            console.error('Error in deleting a Note: ', error.message);
            return{
                success: false,
                message: 'Failed to delete a Note'
            }
        }
    }

    async getAllNotes(caseId: string): Promise<{ success: boolean; message: string; notes: Note[] | null}>{
        try{
            const notes = await this.noteRepository.getCaseNotes(caseId);
            if(notes){
                return{
                    success: true,
                    message: 'Notes are fetched successfully',
                    notes: notes
                }
            }
            return{
                success: false,
                message: 'Failed to fetch the notes',
                notes: null
            }
        }catch(error){
            console.error('Error in fetching all the notes: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the notes',
                notes: null
            }
        }
    }
}