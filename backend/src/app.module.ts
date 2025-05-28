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
import { NoteModule } from './modules/note/modules/note.module';
import { EventModule } from './modules/event/modules/event.module';
import { DocumentModule } from './modules/document/modules/document.module';
import { ChatModule } from './modules/chat/modules/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    LawyerModule,
    CaseModule,
    TagModule,
    NoteModule,
    EventModule,
    DocumentModule,
    ChatModule,
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
      { path: 'documents', method: RequestMethod.ALL },
      { path: 'notes', method: RequestMethod.ALL },
      { path: 'events', method: RequestMethod.ALL },
      { path: 'chats', method: RequestMethod.ALL }
    );
  }
}