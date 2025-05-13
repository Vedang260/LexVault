import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { NoteService } from '../services/note.service';
import { NoteRepository } from '../repositories/note.repository';
import { NoteController } from '../controllers/note.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
  exports: [NoteService, NoteRepository],
})
export class NoteModule {}