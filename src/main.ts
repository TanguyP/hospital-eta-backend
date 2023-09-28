const Parser = require('teltonika-parser-ex');
const binutils = require('binutils64');
const net = require('net');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: 2023-10-17: refactor this; the endpoint to track location updates should be a Nest.js app module
function createGpsTrackerServer() {
  let server = net.createServer((c) => {
    console.log("client connected");
    c.on('end', () => {
      console.log("client disconnected");
    });

    c.on('data', (data) => {
      let buffer = data;
      let parser = new Parser(buffer);
      if(parser.isImei){
        c.write(Buffer.alloc(1, 1));
      }
      else {
        let avl = parser.getAvl();

        let writer = new binutils.BinaryWriter();
        writer.WriteInt32(avl.number_of_data);

        let response = writer.ByteBuffer;
        c.write(response);
      }

      const avl = parser.getAvl();
      if(typeof avl.records !== "undefined" && avl.number_of_data > 0) {
        console.log(avl.records.at(-1).gps);
      }
    });
  });

  server.listen(3636, () => {
    console.log("Server started");
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  createGpsTrackerServer();
}
bootstrap();
