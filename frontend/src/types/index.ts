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

export interface Seat {
  seatNumber: string;
  row: number;
  column: number;
  isAvailable: boolean;
  seatType: 'sleeper' | 'semi-sleeper' | 'seater';
}

export interface Booking {
  bookingId: string;
  status: string;
  expiresAt: string;
}

export interface PassengerDetails {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

