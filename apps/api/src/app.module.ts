import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { TRPCModule } from 'nestjs-trpc';
import { auth } from '@/lib/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/api-client/src/server'
    }),
    AuthModule.forRoot({
      auth
    })
  ],
})
export class AppModule { }
