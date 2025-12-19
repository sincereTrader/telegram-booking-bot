export interface Bus {
  id: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  availableSeats: number;
  busType: string;
  source: string;
  destination: string;
  date: string;
}

export interface BusDetails extends Bus {
  amenities?: string[];
  rating?: string;
}

export interface Seat {
  seatNumber: string;
  row: number;
  column: number;
  isAvailable: boolean;
  seatType: 'sleeper' | 'semi-sleeper' | 'seater';
}

