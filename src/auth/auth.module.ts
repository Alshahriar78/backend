import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 💡 ConfigModule ও ConfigService ইমপোর্ট করুন

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AdminsModule } from '../admins/admins.module.js';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    AdminsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    
    // 💡 register এর বদলে registerAsync ব্যবহার করুন যাতে .env ফাইল সঠিকভাবে রিড হয়
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // .env থেকে সিক্রেট কী নিবে
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy], 
})
export class AuthModule {}
