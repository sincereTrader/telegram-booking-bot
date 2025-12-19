import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bus, Seat, Booking, PassengerDetails } from '../types';

interface AppState {
  currentView: 'search' | 'busList' | 'seatMap' | 'bookingSummary';
  searchParams: {
    source: string;
    destination: string;
    date: string;
  } | null;
  buses: Bus[];
  selectedBus: Bus | null;
  seats: Seat[];
  selectedSeats: string[];
  passengerDetails: PassengerDetails | null;
  booking: Booking | null;
  loading: boolean;
  error: string | null;
}

interface AppContextType extends AppState {
  setCurrentView: (view: AppState['currentView']) => void;
  setSearchParams: (params: AppState['searchParams']) => void;
  setBuses: (buses: Bus[]) => void;
  setSelectedBus: (bus: Bus | null) => void;
  setSeats: (seats: Seat[]) => void;
  setSelectedSeats: (seats: string[]) => void;
  setPassengerDetails: (details: PassengerDetails | null) => void;
  setBooking: (booking: Booking | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentView: 'search',
    searchParams: null,
    buses: [],
    selectedBus: null,
    seats: [],
    selectedSeats: [],
    passengerDetails: null,
    booking: null,
    loading: false,
    error: null,
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setCurrentView: (view) => updateState({ currentView: view }),
        setSearchParams: (params) => updateState({ searchParams: params }),
        setBuses: (buses) => updateState({ buses }),
        setSelectedBus: (bus) => updateState({ selectedBus: bus }),
        setSeats: (seats) => updateState({ seats }),
        setSelectedSeats: (seats) => updateState({ selectedSeats: seats }),
        setPassengerDetails: (details) => updateState({ passengerDetails: details }),
        setBooking: (booking) => updateState({ booking }),
        setLoading: (loading) => updateState({ loading }),
        setError: (error) => updateState({ error }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}

