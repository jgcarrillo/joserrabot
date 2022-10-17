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

  getLongitude(): number {
    return this.longitude;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLine(): string {
    return this.line;
  }

  getURL(): string {
    return this.URI;
  }

  async getDataByLine(): Promise<AxiosResponse<ApiBusLineResponse>> {
    return await axios.get(this.URI);
  }

  async getDataByLongLat(): Promise<AxiosResponse<ApiBusLatLongResponse>> {
    return await axios.get(this.URI);
  }
}
