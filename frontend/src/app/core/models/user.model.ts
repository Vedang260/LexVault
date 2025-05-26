import { Role } from "../constants/role.enum"

export interface User{
    firstName: string
    lastName: string 
    email: string
    password: string
    role: Role  
}