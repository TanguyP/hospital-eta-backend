import { Test, TestingModule } from '@nestjs/testing';
import { GpsTrackerGateway } from './gps_tracker.gateway';

describe('GpsTrackerGateway', () => {
  let gateway: GpsTrackerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpsTrackerGateway],
    }).compile();

    gateway = module.get<GpsTrackerGateway>(GpsTrackerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
