import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";
import { Case } from "src/modules/case/entities/case.entity";

@Entity({ name: 'chat_room'})
export class ChatRoom{
    @PrimaryGeneratedColumn('uuid')
    chatRoomId: string;

    @Column('uuid')
    caseId: string;

    @Column('uuid', { array: true })
    memberIds: string[];

    @OneToMany(() => Message, (message) => message.chatRoom)
    messages: Message[];

    @OneToOne(() => Case)
    @JoinColumn({ name: 'caseId' })
    case: Case

    @CreateDateColumn()
    createdAt: Date;
}