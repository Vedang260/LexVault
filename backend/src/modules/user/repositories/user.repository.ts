import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserRole } from 'src/common/enums/roles.enums';

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}        

    // finds the user by email
    async findUserByEmail(email: string): Promise<User | null> {
        try{
            return this.userRepository.findOne({ where: { email } });
        }catch(error){
            console.error('Error in finding user by email: ', error.message);
            throw new InternalServerErrorException('Error in finding user by email');
        }
    }

    // creates new user 
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try{
            const user = this.userRepository.create(createUserDto);
            return this.userRepository.save(user);
        }catch(error){
            console.error('Error in creating new user ', error.message);
            throw new InternalServerErrorException('Error in creating new user');
        }
    }

    // deletes a user
    async deleteUser(id: string): Promise<boolean> {
        try{
            const result = await this.userRepository.delete(id);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a user ', error.message);
            throw new InternalServerErrorException('Error in deleting a user');
        }
    }

    // get all users
    async findAll(): Promise<User[]> {
      try{
        return this.userRepository.find({
            select: ['userId', 'username', 'email', 'role'], // only desired fields
            where: {
                role: Not(UserRole.ADMIN) // exclude admins
            }
        });
      }
      catch(error){
        throw error;
      }
    }
    
    // finds a particular User based on user_id
    async findOne(userId: string): Promise<User | null> {
      return this.userRepository.findOne({ where: { userId } });
    }
}