import { CaseCategory } from "src/common/enums/caseCategory.enums";
import { CasePriority } from "src/common/enums/casePriority.enums";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { Lawyer } from "src/modules/lawyer/entities/lawyer.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Document } from  "src/modules/document/entities/document.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Note } from "src/modules/note/entities/note.entity";
import { Event } from "src/modules/event/entities/event.entity";
import { TimeEntry } from "src/modules/time-entry/entities/timeEntry.entity";

@Entity({ name: 'cases' })
export class Case{
    @PrimaryGeneratedColumn('uuid')
    caseId: string;

    @Column('uuid')
    clientId: string;
    
    @Column({ nullable: true })
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ unique: true, nullable: true  })
    caseNumber: string;

    @Column({
    type: 'enum',
    enum: CaseStatus,
    default: CaseStatus.DRAFT,
    })
    status: CaseStatus;

    @Column({
        type: 'enum',
        enum: CaseCategory,
        nullable: true
    })
    category: CaseCategory;

    @Column({
    type: 'enum',
    enum: CasePriority,
    default: CasePriority.MEDIUM,
    })
    priority: CasePriority;

    @Column({ type: 'date', nullable: true })
    openedDate: Date;

    @Column({ type: 'date', nullable: true })
    closedDate: Date;

    @Column({ type: 'date', nullable: true })
    expectedResolutionDate: Date;

    @Column({ nullable: true })
    courtName: string;

    @Column({ nullable: true })
    courtCaseNumber: string;

    @OneToMany(() => Document, (document) => document.case)
    documents: Document[];

    @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.case)
    timeEntries: TimeEntry[];
    
    @ManyToOne(() => User, (user) => user.casesAsClient)
    @JoinColumn({ name: 'clientId' })
    client: User;

    @ManyToMany(() => Lawyer,  (lawyer) => lawyer.cases)
    @JoinTable({
        name: 'case_assignedlawyers',
        joinColumn: {
            name: 'caseId',
            referencedColumnName: 'caseId',
        },
        inverseJoinColumn: {
            name: 'lawyerId',
            referencedColumnName: 'lawyerId',
        },
    })
    assignedLawyers: Lawyer[];
  
    @Column({ default: false})
    assigned: boolean;

    @OneToMany(() => Note, (note) => note.case)
    notes: Note[];

    @OneToMany(() => Event, (event) => event.case)
    events: Event[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}