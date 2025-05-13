// note.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Case } from '../../case/entities/case.entity';

@Entity({ name: 'notes'})
export class Note {
  @PrimaryGeneratedColumn('uuid')
  noteId: string;

  @Column()
  title: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  caseId: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: true })
  isPrivate: boolean; // Visible only to author or Admins

  // Relationships
  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'userId' })
  lawyer: User;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.notes)
  @JoinColumn({ name: 'caseId' })
  case: Case;
}