import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// lawyer.entity.ts
@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn('uuid')
  lawyerId: string;

  @Column()
  barLicenseNumber: string;

  @Column({
    type: 'enum',
    enum: LawSpecialization
  })
  specialization: LawSpecialization;

  @Column()
  yearsOfExperience: number;

  @Column({ type: 'decimal' })
  hourlyRate: number;

  @Column({ nullable: true })
  firmName: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToOne(() => User, (user) => user.lawyerProfile)
  user: User;
}
