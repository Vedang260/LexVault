import { EventType } from "../constants/event.enum";

export interface CreateEvent{
    caseId: string,
    title: string,
    description: string
    eventDate: string
    eventTime: string
    type: EventType
}

export interface Event extends CreateEvent{
    eventId: string
}

export interface CreateEventResponse{
    success: boolean
    message: string
}

export interface GetAllCaseEvents extends CreateEventResponse{
    events: Event[]
}

export interface GetAllEvents extends CreateEventResponse{
    events: Event[]
}

export interface DeleteEventResponse extends CreateEventResponse{}