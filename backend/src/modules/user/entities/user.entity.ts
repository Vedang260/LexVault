import { UserRole } from "src/common/enums/roles.enums";
import { Case } from "src/modules/case/entities/case.entity";
import { Lawyer } from "src/modules/lawyer/entities/lawyer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}