import { LawSpecialization } from "src/common/enums/lawSpecialization.enums";
import { Case } from "src/modules/case/entities/case.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// lawyer.entity.ts
@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn('uuid')
  lawyerId: string;

  @Column('uuid')
  userId: string;

  @Column()
  barLicenseNumber: string;

  @Column()
  licenseDocumentUrl: string;

  @Column()
  licensePublicId: string;
  
  @Column({
    type: 'enum',
    enum: LawSpecialization
  })
  specialization: LawSpecialization;

  @Column()
  licenseIssueDate: Date;

  @Column()
  licenseExpiryDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  yearsOfExperience: number;

  @Column()
  bio: string;

  @Column({ type: 'decimal' })
  hourlyRate: number;

  @Column({ nullable: true })
  firmName: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToOne(() => User, (user) => user.lawyerProfile)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Case, (caseEntity) => caseEntity.assignedLawyers)
  cases: Case[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
