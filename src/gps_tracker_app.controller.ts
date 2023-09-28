import { Controller, Get } from '@nestjs/common';
import { GpsTrackerAppService } from './gps_tracker_app.service';

@Controller()
export class GpsTrackerAppController {
  constructor(private readonly appService: GpsTrackerAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
