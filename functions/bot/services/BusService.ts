import axios, { AxiosResponse } from 'axios';

interface Stop {
  id: number;
  name: string;
  city: string;
  city_id: string;
  latitude: number;
  longitude: number;
  order: number;
}

interface Line {
  id: string;
  name: string;
  route: number;
  synoptic: string;
  direction: number;
  headsign: string;
  city: string;
  city_id: number;
  hours: string[];
  comments: string[];
}

interface ApiBusLineResponse {
  [index: number]: LineResponse;
}

interface LineResponse {
  id: string;
  name: string;
  route: string;
  synoptic: string;
  service: number;
  headsign: string;
  direction: number;
  stops: Stop[];
}

interface ApiBusLatLongResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  lines: Line[];
}

export default class BusService {
  private readonly URI: string = '';
  private readonly longitude: number = 0;
  private readonly latitude: number = 0;
  private readonly line: string = '';

  /**
   *
   * @param {number} latitude - The latitude of the station
   * @param {number} longitude - The longitude of the station
   * @param {string} line - The number (id) of the station
   */
  constructor(latitude?: number, longitude?: number, line?: string) {
    if (latitude !== undefined && longitude !== undefined) {
      this.latitude = latitude;
      this.longitude = longitude;

      this.URI = `https://api.latbus.com/latbusapp/rest/nearestStops?latitude=${latitude}&longitude=${longitude}`;
    }

    if (line !== undefined) {
      this.line = line;

      this.URI = `https://api.latbus.com/latbusapp/rest/line/${line}`;
    }
  }

  /**
   * This function returns the current longitude
   * @returns {number} - The current longitude
   */
  getLongitude(): number {
    return this.longitude;
  }

  /**
   * This function returns the current latitude
   * @returns {number} - The current latitude
   */
  getLatitude(): number {
    return this.latitude;
  }

  /**
   * This function returns the current line
   * @returns {string} - The current line
   */
  getLine(): string {
    return this.line;
  }

  /**
   * This function returns the current URL
   * @returns {string} - The current URL
   */
  getURL(): string {
    return this.URI;
  }

  /**
   * This function returns the data of the bus station for the current line
   * @returns {Promise<AxiosResponse<ApiBusLineResponse>>} - The data of the current line
   */
  async getDataByLine(): Promise<AxiosResponse<ApiBusLineResponse>> {
    return await axios.get(this.URI);
  }

  async getDataByLongLat(): Promise<AxiosResponse<ApiBusLatLongResponse>> {
    return await axios.get(this.URI);
  }
}
