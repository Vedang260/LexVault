export interface Note{
    noteId: string
    title: string
    content: string
    caseId: string
    userId: string
    createdAt: string
    updatedAt: string
    isPrivate: boolean   
}

export interface CreateNoteResponse{
    success: boolean,
    message: string
}

export interface DeleteNoteResponse extends CreateNoteResponse{}

export interface UpdateNoteResponse extends CreateNoteResponse{}