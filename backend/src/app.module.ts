import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/modules/user.module';
import { AuthModule } from './modules/auth/modules/auth.module';
import { typeOrmConfig } from './config/database.config';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './utils/uploads/modules/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    UploadModule
  ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: 'api/webhooks/stripe', method: RequestMethod.ALL }, // ✅ Exclude webhook
    )
    .forRoutes(
      { path: 'users', method: RequestMethod.ALL },
    );
  }
}