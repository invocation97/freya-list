import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TRPCModule } from 'nestjs-trpc';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local'
    }),
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/api-client/src/server'
    })
  ],
})
export class AppModule { }
