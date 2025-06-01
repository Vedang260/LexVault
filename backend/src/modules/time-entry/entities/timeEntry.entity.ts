import { Case } from "src/modules/case/entities/case.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'time-entry'})
export class TimeEntry{
    @PrimaryGeneratedColumn('uuid')
    timeEntryId: string;

    @Column({ type: 'uuid'})
    userId: string;

    @Column({ type: 'uuid'})
    caseId: string;

    @Column({ type: 'date' })
    date: string; 

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @Column()
    duration: number; 

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column({ default: true })
    billable: boolean;

    @Column({ default: false })
    billed: boolean; // Tracks if included in an invoice

    // Relationships
    @ManyToOne(() => User, (user) => user.timeEntries)
    @JoinColumn({ name: 'userId' })
    lawyer: User;

    @ManyToOne(() => Case, (caseEntity) => caseEntity.timeEntries)
    @JoinColumn({ name: 'caseId' })
    case: Case;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}