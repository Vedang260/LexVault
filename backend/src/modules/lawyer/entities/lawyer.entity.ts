import { LawSpecialization } from "src/common/enums/lawSpecialization.enums";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// lawyer.entity.ts
@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn('uuid')
  lawyerId: string;

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
