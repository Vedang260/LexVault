import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<{ success: boolean; message: string; users?: User[] | null }> {
    try{
      const users = await this.userRepository.findAll();
      return {
        success: true,
        message: 'All users are retrieved successfully',
        users: users
      }
    }catch(error){
      console.error('Error in fetching all the users: ', error.message);
      return {
        success: false,
        message: 'Internal Server Error'
      }
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async removeUser(id: string): Promise<{ success: boolean, message: string}> {
    try{
      const result = await this.userRepository.deleteUser(id);
    
    if (!result) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return{
      success: true,
      message: 'User is deleted'
    }
    }catch(error){
       console.error('Error in deleting the user');
       return{
        success: false,
        message: 'User is deleted successfully'
       }
    }
  }
} 