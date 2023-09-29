import axios from 'axios';

import config from './secret/config.json' assert {type: 'json'};

class RouteService {
	static rawUrl = "https://api.openrouteservice.org/v2/directions/driving-car?api_key={key}&start={start_lon},{start_lat}&end={end_lon},{end_lat}";

  static async getRoute(startLon, startLat, endLon, endLat) {
    const url = this.getUrl(startLon, startLat, endLon, endLat);
    const response = await axios.get(url);
    return response.data;
  }

  static getUrl(startLon, startLat, endLon, endLat) {
    return this.rawUrl.replace(/\{key\}/g, config.directions_api_key)
      .replace(/\{start_lon\}/g, startLon)
      .replace(/\{start_lat\}/g, startLat)
      .replace(/\{end_lon\}/g, endLon)
      .replace(/\{end_lat\}/g, endLat);
  }
}

export default RouteService;
