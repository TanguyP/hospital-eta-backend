import { Module } from '@nestjs/common';
import { GpsTrackerAppController } from './gps_tracker_app.controller';
import { GpsTrackerAppService } from './gps_tracker_app.service';

@Module({
  imports: [],
  controllers: [GpsTrackerAppController],
  providers: [GpsTrackerAppService],
})
export class GpsTrackerAppModule {}
