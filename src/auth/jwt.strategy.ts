import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 💡 ConfigService ইমপোর্ট করুন
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 💡 কনস্ট্রাক্টরের ভেতর ConfigService ইনজেক্ট করুন
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 💡 process.env-এর বদলে configService.get() ব্যবহার করুন
      secretOrKey: configService.get<string>('JWT_SECRET')!, 
    });
  }

  async validate(payload: any) {
    console.log('=== decoded payload ===', payload); 
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
