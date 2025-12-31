import { Controller, Get, Injectable } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@Controller('health')

export class HealthController {
    @Get()
    @AllowAnonymous()
    async check() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version,
            environment: process.env.NODE_ENV,
            database: {
                status: 'ok',
                timestamp: new Date().toISOString(),
            },
            cache: {
                status: 'ok',
                timestamp: new Date().toISOString(),
            },
        }
    }
}