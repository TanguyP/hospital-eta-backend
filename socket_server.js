import binutils from 'binutils64';
import net from 'net';
import Parser from 'teltonika-parser-ex';

import DataStore from './data_store.js';


class SocketServer {
  constructor(port) {
    this.__server = net.createServer((c) => {
      console.log("client connected");
      c.on('end', this.onEnd);
      c.on('data', (data) => { this.onData(data, c); });
    });

    this.__server.listen(port, () => {
      console.log("Server started");
    });
  }

  onEnd() {
    console.log("client disconnected");
  }

  async onData(data, c) {
    let buffer = data;
    let parser = new Parser(buffer);
    if (parser.isImei) {
      c.write(Buffer.alloc(1, 1));
    } else {
      let avl = parser.getAvl();

      let writer = new binutils.BinaryWriter();
      writer.WriteInt32(avl.number_of_data);

      let response = writer.ByteBuffer;
      c.write(response);
    }

    const avl = parser.getAvl();
    if (typeof avl.records === "undefined" || avl.number_of_data === 0) {
      return;
    }

    const gpsInfo = avl.records.at(-1).gps;
    if (typeof gpsInfo === "undefined" || typeof gpsInfo.longitude === "undefined") {
      console.warn("Got empty GPS info");
      return;
    }

    console.log(gpsInfo);
    const location = { longitude: gpsInfo.longitude, latitude: gpsInfo.latitude };
    await DataStore.put('location', location);
  }
}

export default SocketServer;
