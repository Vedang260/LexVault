import { Module } from "@nestjs/common";
import { TimeEntry } from "../entities/timeEntry.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeEntryController } from "../controllers/timeEntry.controller";
import { TimeEntryRepository } from "../repositories/timeEntry.repository";
import { TimeEntryService } from "../services/timeEntry.service";

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntry])],
  controllers: [TimeEntryController],
  providers: [TimeEntryService, TimeEntryRepository],
  exports: [TimeEntryService, TimeEntryRepository],
})
export class TimeEntryModule{}