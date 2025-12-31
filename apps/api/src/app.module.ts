import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { TRPCModule } from 'nestjs-trpc';
import { auth } from '@/lib/auth';
import { HealthController } from '@/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV !== 'production'
          ? ({
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: false,
                colorize: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            },
          } as any)
          : undefined,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST', 'localhost');
        const redisPort = configService.get<number>('REDIS_PORT', 6379);
        const redisPassword = configService.get<string>('REDIS_PASSWORD');

        try {
          const store = await redisStore({
            socket: {
              host: redisHost,
              port: redisPort,
              connectTimeout: 5000,
            },
            password: redisPassword,
          });
          return {
            store,
            ttl: 300, // Default TTL of 5 minutes
          };
        } catch (error) {
          console.warn('Redis connection failed, using in-memory cache:', error);
          return {
            ttl: 300,
          };
        }
      },
      inject: [ConfigService],
    }),
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/api-client/src/server',
    }),
    AuthModule.forRoot({
      auth,
    }),
  ],
  controllers: [HealthController],
})
export class AppModule { }
