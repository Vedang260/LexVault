import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../user/modules/user.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LawyerModule } from 'src/modules/lawyer/modules/lawyer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Ensure this is here
    UsersModule,
    LawyerModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        Logger.log(`Loaded JWT_SECRET: ${secret}`, 'AuthModule'); // Debugging log
        return {
          secret: secret || 'fallback-secret', // Avoid undefined
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}