import axios, { AxiosResponse } from 'axios';
import { ApiBusLatLongResponse, ApiBusLineResponse } from '../types/types';

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
