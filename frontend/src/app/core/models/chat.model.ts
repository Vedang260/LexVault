export interface ChatRoom {
  chatRoomId: string;
  caseId: string;
  memberIds: string[];
  createdAt: string;
  otherMember?: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface Message{
    messageId: string;
    chatRoomId: string;
    content: string;
    senderId: string;
    user: {
        firstName: string;
        lastName: string;
        role: string;
    };
    createdAt: string;
    isCurrentUser?: boolean;
}