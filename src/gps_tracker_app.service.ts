import { Injectable } from '@nestjs/common';

@Injectable()
export class GpsTrackerAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
