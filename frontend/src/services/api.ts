import axios from 'axios';
import { WebApp } from '@twa-dev/sdk';
import { Bus, Seat, Booking, PassengerDetails } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Telegram initData to all requests
api.interceptors.request.use((config) => {
  const initData = WebApp.initData;
  if (initData) {
    config.headers['x-telegram-init-data'] = initData;
  }
  return config;
});

export const apiService = {
  async searchBuses(source: string, destination: string, date: string): Promise<Bus[]> {
    const response = await api.post<{ status: string; data: { buses: Bus[] } }>('/api/search', {
      source,
      destination,
      date,
    });
    return response.data.data.buses;
  },

  async getBusDetails(busId: string): Promise<Bus> {
    const response = await api.get<{ status: string; data: { bus: Bus } }>(`/api/buses/${busId}`);
    return response.data.data.bus;
  },

  async getSeatAvailability(busId: string): Promise<Seat[]> {
    const response = await api.get<{ status: string; data: { seats: Seat[] } }>(`/api/seats/${busId}`);
    return response.data.data.seats;
  },

  async reserveBooking(
    busId: string,
    seatIds: string[],
    passengerDetails: PassengerDetails,
    source?: string,
    destination?: string,
    travelDate?: string
  ): Promise<Booking> {
    const response = await api.post<{ status: string; data: Booking }>('/api/bookings/reserve', {
      busId,
      seatIds,
      source,
      destination,
      travelDate,
      passengerDetails,
    });
    return response.data.data;
  },

  async getBooking(bookingId: string): Promise<Booking> {
    const response = await api.get<{ status: string; data: { booking: Booking } }>(
      `/api/bookings/${bookingId}`
    );
    return response.data.data.booking;
  },
};

