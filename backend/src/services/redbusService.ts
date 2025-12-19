import { Bus, Seat, BusDetails } from '../types/redbus';

// Mock bus operators
const OPERATORS = [
  'RedBus',
  'SRS Travels',
  'KPN Travels',
  'Orange Travels',
  'VRL Travels',
  'Kallada Travels',
  'Parveen Travels',
  'Raj Ratan Tours',
];

// Mock bus types
const BUS_TYPES = ['Sleeper', 'Semi-Sleeper', 'Seater', 'AC Sleeper', 'AC Seater'];

// Mock cities
const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
];

// Generate random time between 6 AM and 11 PM
function randomTime(): string {
  const hour = Math.floor(Math.random() * 18) + 6;
  const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

// Calculate arrival time based on departure and duration
function calculateArrivalTime(departureTime: string, durationHours: number): string {
  const [hours, minutes] = departureTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationHours * 60;
  const arrivalHours = Math.floor(totalMinutes / 60) % 24;
  const arrivalMins = totalMinutes % 60;
  return `${arrivalHours.toString().padStart(2, '0')}:${arrivalMins.toString().padStart(2, '0')}`;
}

// Generate mock buses
function generateMockBuses(source: string, destination: string, date: string): Bus[] {
  const count = Math.floor(Math.random() * 8) + 5; // 5-12 buses
  const buses: Bus[] = [];

  for (let i = 0; i < count; i++) {
    const departureTime = randomTime();
    const durationHours = Math.random() * 8 + 4; // 4-12 hours
    const arrivalTime = calculateArrivalTime(departureTime, durationHours);
    const availableSeats = Math.floor(Math.random() * 30) + 5; // 5-35 seats

    buses.push({
      id: `bus-${Date.now()}-${i}`,
      operator: OPERATORS[Math.floor(Math.random() * OPERATORS.length)],
      departureTime,
      arrivalTime,
      duration: `${Math.floor(durationHours)}h ${Math.floor((durationHours % 1) * 60)}m`,
      availableSeats,
      busType: BUS_TYPES[Math.floor(Math.random() * BUS_TYPES.length)],
      source,
      destination,
      date,
    });
  }

  // Sort by departure time
  return buses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}

// Generate mock seat layout (2x2 sleeper or 2x1 seater)
function generateMockSeats(busId: string, busType: string): Seat[] {
  const seats: Seat[] = [];
  const isSleeper = busType.toLowerCase().includes('sleeper');
  const rows = isSleeper ? 12 : 20; // Sleeper has fewer rows
  const colsPerSide = isSleeper ? 2 : 1; // Sleeper: 2x2, Seater: 2x1

  let seatNumber = 1;
  for (let row = 1; row <= rows; row++) {
    // Left side
    for (let col = 1; col <= colsPerSide; col++) {
      const isAvailable = Math.random() > 0.3; // 70% chance of being available
      seats.push({
        seatNumber: seatNumber.toString(),
        row,
        column: col,
        isAvailable,
        seatType: isSleeper ? 'sleeper' : 'seater',
      });
      seatNumber++;
    }
    // Right side
    for (let col = 1; col <= colsPerSide; col++) {
      const isAvailable = Math.random() > 0.3;
      seats.push({
        seatNumber: seatNumber.toString(),
        row,
        column: colsPerSide + col,
        isAvailable,
        seatType: isSleeper ? 'sleeper' : 'seater',
      });
      seatNumber++;
    }
  }

  return seats;
}

class RedBusService {
  async searchBuses(source: string, destination: string, date: string): Promise<Bus[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return generateMockBuses(source, destination, date);
  }

  async getBusDetails(busId: string): Promise<BusDetails | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Extract bus info from ID or generate new
    const operator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
    const busType = BUS_TYPES[Math.floor(Math.random() * BUS_TYPES.length)];
    const departureTime = randomTime();
    const durationHours = Math.random() * 8 + 4;
    const arrivalTime = calculateArrivalTime(departureTime, durationHours);

    return {
      id: busId,
      operator,
      departureTime,
      arrivalTime,
      duration: `${Math.floor(durationHours)}h ${Math.floor((durationHours % 1) * 60)}m`,
      busType,
      amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
    };
  }

  async getSeatAvailability(busId: string): Promise<Seat[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Get bus details to determine seat layout
    const bus = await this.getBusDetails(busId);
    if (!bus) {
      return [];
    }

    return generateMockSeats(busId, bus.busType);
  }
}

export const redbusService = new RedBusService();

