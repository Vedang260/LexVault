import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "src/modules/document/entities/document.entity";

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