import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'documents'})
export class Document{

    @PrimaryGeneratedColumn('uuid')
    documentId: string;

    @Column('uuid')
    caseId: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    version: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploadedAt: Date;

    @Column({ default: false })
    isConfidential: boolean;
}