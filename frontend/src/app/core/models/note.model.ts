export interface UpdateNote{
    title: string
    content: string
}

export interface CreateNote extends UpdateNote{
    caseId: string
}

export interface Note extends CreateNote{
    noteId: string
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

export interface GetAllNotes extends CreateNoteResponse{
    notes: Note[] | []
}