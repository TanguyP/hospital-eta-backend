import http from 'http';

import DataStore from './data_store.js';


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
    let gpsLocation = await DataStore.get("gps_location");
    if (gpsLocation === null) {
      return [409, { error: "GPS data not available" }];
    }
    return [200, gpsLocation];
  }
}

export default HttpServer;
