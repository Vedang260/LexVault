import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Case } from '../../case/entities/case.entity';
import { EventType } from 'src/common/enums/eventType.enums';

@Entity({ name: 'events'})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column('uuid')
  caseId: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'date' })
  eventDate: Date;

  @Column()
  eventTime: string;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  type: EventType;

  // Relationships
  @ManyToOne(() => Case, (caseEntity) => caseEntity.events)
  @JoinColumn({ name: 'caseId' })
  case: Case;
}