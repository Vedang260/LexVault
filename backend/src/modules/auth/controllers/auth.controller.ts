import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { CreateUserDto } from '../../user/dtos/createUser.dto';
import { CreateLawyerDto } from 'src/modules/lawyer/dtos/createLawyer.dto';

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Post('register/lawyer')
    async registerLawyer(@Body() createLawyerDto: CreateLawyerDto){
        return this.authService.registerLawyer(createLawyerDto);
    }
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
    
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}