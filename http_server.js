import http from 'http';

import config from './secret/config.json' assert {type: 'json'}
import DataStore from './data_store.js';
import RouteService from './route_service.js';


// TODO: 2023-10-06: authentication
class HttpServer {
  constructor(port) {
    const httpServer = http.createServer();

    httpServer.on('request', (request, response) => {
      this.handleRequest(request, response);
    });

    httpServer.listen(port);
  }
  
  async handleRequest(request, response) {
    const method = request.method;
    const path = request.url;
    let responseCode = null;
    let responseData = null;

    if (method === "GET" && path === "/gps_location") {
      [responseCode, responseData] = await this.getGpsLocationAction();
    }
    else {
      [responseCode, responseData] = [404, null];
    }

    this.renderResponse(response, responseCode, responseData);
  }

  renderResponse(response, code, data) {
    response.writeHead(code, { 'Content-Type': 'application/json' });
    const renderedData = data === null ? null : JSON.stringify({ data: data });
    response.end(renderedData);
  }
  
  async getGpsLocationAction() {
    const gpsLocation = await DataStore.get("gps_location");
    if (gpsLocation === null) {
      return [409, { error: "GPS data not available" }];
    }

    const routeData = await RouteService.getRoute(
      gpsLocation.longitude,
      gpsLocation.latitude,
      config.hospital.longitude,
      config.hospital.latitude,
    );

    return [200, routeData];
  }
}

export default HttpServer;
