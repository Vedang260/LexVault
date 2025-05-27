import { DocumentType } from "src/common/enums/documentType.enums";
import { Case } from "src/modules/case/entities/case.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'documents'})
export class Document{

    @PrimaryGeneratedColumn('uuid')
    documentId: string;

    @Column({
        type: 'enum',
        enum: DocumentType,
    })
    documentType: DocumentType;

    @Column()
    documentUrl: string;

    @Column('uuid')
    caseId: string;

    @Column('uuid')
    userId: string;

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

    @ManyToOne(() => User, (user) => user.uploadedDocuments, { nullable: true })
    @JoinColumn({ name: 'userId' })
    uploadedBy: User;

    @ManyToOne(() => Case, (caseEntity) => caseEntity.documents)
    @JoinColumn({ name: 'caseId'})
    case: Case;

    @ManyToMany(() => Tag, (tag) => tag.documents)
    @JoinTable({
        name: 'document_tags',
        joinColumn: {
            name: 'documentId',
            referencedColumnName: 'documentId',
        },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'tagId',
        },
    })
    tags: Tag[];
}