export interface CreateCase{
    description: string
}

export interface CreateCaseResponse{
    success: boolean,
    message: string
}

export interface Case{
    caseId: string
    clientId: string
    title: string
    description: string
    caseNumber: string
    status: string
    category: string
    priority: string,
    openedDate: string,
    closedDate: string | null,
    expectedResolutionDate: string,
    courtName: string,
    courtCaseNumber: string,
    assigned: boolean,
    createdAt: string,
    updatedAt: string
}

export interface GetAssignedCasesOfLawyerResponse{
    success: boolean
    message: string
    cases?: Case[]
}