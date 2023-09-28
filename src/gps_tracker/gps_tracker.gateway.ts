import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class GpsTrackerGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log("got message");
    return 'Hello world!';
  }
}
