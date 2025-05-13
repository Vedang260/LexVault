import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "src/modules/document/entities/document.entity";

@Entity({ name: 'tags' })
export class Tag{
    @PrimaryGeneratedColumn('uuid')
    tagId: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    colorCode: string;

    // Relationships
    @ManyToMany(() => Document, (document) => document.tags)
    documents: Document[];
}