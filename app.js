import SocketServer from './socket_server.js';
import HttpServer from './http_server.js';


new SocketServer(3636);
new HttpServer(8080);
