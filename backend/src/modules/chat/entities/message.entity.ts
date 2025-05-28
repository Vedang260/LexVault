import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoom } from "./chatRoom.entity";

@Entity({ name: 'messages'})
export class Message{
    @PrimaryGeneratedColumn('uuid')
    messageId: string;

    @Column('uuid')
    chatRoomId: string;

    @Column({ type: 'text' })
    content: string;
    
    @Column('uuid')
    senderId: string;

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn({ name: 'senderId'})
    user: User;

    @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
    @JoinColumn({ name: 'chatRoomId' })
    chatRoom: ChatRoom;

    @CreateDateColumn()
    createdAt: Date;
}