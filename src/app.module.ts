import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './models/user/user.module';
import { ConversationModule } from './models/conversation/conversation.module';
import { MessageModule } from './models/message/message.module';
import { RolloModule } from './models/rollo/rollo.module';
import { DocumentoModule } from './models/documento/documento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DATABASE_HOST'),
        port: Number(config.get<string>('DATABASE_PORT')),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),

        autoLoadEntities: true,

        synchronize:
          config.get<string>('DATABASE_SYNCHRONIZE') === 'true',

        logging:
          config.get<string>('DATABASE_LOGGING') === 'true',
      }),
    }),
    AuthModule,
    UserModule,
    ConversationModule,
    MessageModule,
    RolloModule,
    DocumentoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
