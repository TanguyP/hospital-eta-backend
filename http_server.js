import http from 'http';

import DataStore from './data_store.js';


class HttpServer {
  constructor(port) {
    const httpServer = http.createServer();

    httpServer.on('request', (request, response) => {
      const method = request.method;
      const path = request.url;
      let responseCode = null;
      let responseData = null;
      
      if (method === "GET" && path === "/gps_location") {
        [responseCode, responseData] = this.getGpsLocationAction();
      }
      else {
        [responseCode, responseData] = [404, null];
      }

      this.renderResponse(response, responseCode, responseData);
    });

    httpServer.listen(port);
  }
  
  renderResponse(response, code, data) {
    response.writeHead(code, { 'Content-Type': 'application/json' });
    const renderedData = data === null ? null : JSON.stringify({ data: data });
    response.end(renderedData);
  }
  
  getGpsLocationAction() {
    // TBD
    return [404, null];
  }
}

export default HttpServer;
