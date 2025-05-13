import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/modules/user.module';
import { AuthModule } from './modules/auth/modules/auth.module';
import { typeOrmConfig } from './config/database.config';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './utils/uploads/modules/upload.module';
import { LawyerModule } from './modules/lawyer/modules/lawyer.module';
import { CaseModule } from './modules/case/modules/case.module';
import { TagModule } from './modules/tags/modules/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    LawyerModule,
    CaseModule,
    TagModule,
    UploadModule
  ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: 'api/webhooks/stripe', method: RequestMethod.ALL }, // ✅ Exclude webhook
      { path: 'uploads', method: RequestMethod.ALL}
    )
    .forRoutes(
      { path: 'users', method: RequestMethod.ALL },
      { path: 'lawyer', method: RequestMethod.ALL },
      { path: 'case', method: RequestMethod.ALL },
      { path: 'tags', method: RequestMethod.ALL },
    );
  }
}