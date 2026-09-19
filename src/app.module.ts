import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'
import { TournamentsModule } from './tournaments/tournaments.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { MatchesModule } from './matches/matches.module.js';
import { StandingsModule } from './standings/standings.module.js';
import { AnnouncementsModule } from './announcements/announcements.module.js';
import { BannersModule } from './banners/banners.module.js';
import { GalleryModule } from './gallery/gallery.module.js';
import { SponsorsModule } from './sponsors/sponsors.module.js';
import { AdminsModule } from './admins/admins.module.js';
import { AuthModule } from './auth/auth.module.js';



@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        autoLoadEntities: true, // এটি স্বয়ংক্রিয়ভাবে আপনার সব Entity লোড করবে
        synchronize: true, // ডেভেলপমেন্টের জন্য true (প্রোডাকশনে false রাখবেন)
        ssl: {
          rejectUnauthorized: false, // Supabase SSL কানেকশনের জন্য এটি জরুরি
        },
        }),
    }),

    TournamentsModule,

    TeamsModule,

    MatchesModule,
    StandingsModule,
    AnnouncementsModule,
    BannersModule,
    GalleryModule,
    SponsorsModule,
    AdminsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {} // DataSource ইনজেক্ট করুন

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('\n==================================================');
      console.log('Supabase Database connected successfully!');
      console.log('==================================================\n');
    }
  }
}
