import { UserRole } from "src/common/enums/roles.enums";
import { Case } from "src/modules/case/entities/case.entity";
import { Lawyer } from "src/modules/lawyer/entities/lawyer.entity";
import { Document } from "src/modules/document/entities/document.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Note } from "src/modules/note/entities/note.entity";
import { TimeEntry } from "src/modules/time-entry/entities/timeEntry.entity";
import { Message } from "src/modules/chat/entities/message.entity";

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;

    @OneToOne(() => Lawyer, (lawyer) => lawyer.user, { cascade: true })
    lawyerProfile: Lawyer;

    @OneToMany(() => Case, (caseEntity) => caseEntity.client)
    casesAsClient: Case[];

    @OneToMany(() => Document, (document) => document.uploadedBy)
    uploadedDocuments: Document[];

    @OneToMany(() => Note, (note) => note.lawyer)
    notes: Note[];
    
    @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.lawyer)
    timeEntries: TimeEntry[];

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}