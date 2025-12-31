import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';


@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/api-client/src/server'
    })
  ],
})
export class AppModule { }
