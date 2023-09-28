import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpsTrackerGateway } from './gps_tracker/gps_tracker.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GpsTrackerGateway],
})
export class AppModule {}
