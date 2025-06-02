export interface CreateTimeEntry {
  caseId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  title: string;
  description: string;
  billable: boolean;
  billed: boolean;
}

export interface TimeEntry extends CreateTimeEntry{
    timeEntryId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Response{
    success: boolean;
    message: string;
}

export interface GetAllTimeEntries extends Response{
    timeEntries: TimeEntry[];
}

export interface UpdateTimeEntry extends TimeEntry{}