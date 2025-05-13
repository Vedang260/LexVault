import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Case } from '../../case/entities/case.entity';
import { EventType } from 'src/common/enums/eventType.enums';

@Entity({ name: 'events'})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column()
  caseId: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp', nullable: true })
  end: Date;

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