import { useEffect, useState, useCallback } from 'react';
import { useAppState } from '../hooks/useAppState';
import { apiService } from '../services/api';
import { Seat } from '../types';

export default function SeatMap() {
  const { selectedBus, setSeats, seats, selectedSeats, setSelectedSeats, setCurrentView, setLoading, setError, setPassengerDetails } = useAppState();
  const [passengerDetails, setLocalPassengerDetails] = useState({
    name: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
  });

  const loadSeats = useCallback(async () => {
    if (!selectedBus) return;
    
    setLoading(true);
    setError(null);
    try {
      const seatData = await apiService.getSeatAvailability(selectedBus.id);
      setSeats(seatData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load seats. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedBus, setSeats, setLoading, setError]);

  useEffect(() => {
    if (selectedBus) {
      loadSeats();
    }
  }, [selectedBus, loadSeats]);

  const handleSeatClick = (seatNumber: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    if (!passengerDetails.name || !passengerDetails.age) {
      setError('Please fill in passenger details');
      return;
    }

    setPassengerDetails({
      name: passengerDetails.name,
      age: parseInt(passengerDetails.age),
      gender: passengerDetails.gender,
    });
    setCurrentView('bookingSummary');
  };

  const handleBack = () => {
    setCurrentView('busList');
  };

  // Group seats by row
  const seatsByRow: { [key: number]: Seat[] } = {};
  seats.forEach((seat) => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
  });

  const maxColumns = Math.max(...seats.map((s) => s.column));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handleBack} className="text-[var(--tg-theme-link-color)]">
          ← Back
        </button>
        <h2 className="text-xl font-bold">Select Seats</h2>
        <div></div>
      </div>

      {selectedBus && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
          <p className="font-semibold">{selectedBus.operator}</p>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">
            {selectedBus.departureTime} - {selectedBus.arrivalTime} ({selectedBus.duration})
          </p>
        </div>
      )}

      {/* Seat Map */}
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="text-center mb-4">
          <div className="inline-block w-20 h-8 bg-gray-400 rounded mb-2"></div>
          <p className="text-xs text-[var(--tg-theme-hint-color)]">Driver</p>
        </div>

        <div className="space-y-2">
          {Object.keys(seatsByRow)
            .sort((a, b) => Number(a) - Number(b))
            .map((row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="text-xs font-medium w-8">{row}</span>
                <div className="flex gap-1 flex-1">
                  {seatsByRow[Number(row)]
                    .sort((a, b) => a.column - b.column)
                    .map((seat) => {
                      const isSelected = selectedSeats.includes(seat.seatNumber);
                      const isAvailable = seat.isAvailable;

                      return (
                        <button
                          key={seat.seatNumber}
                          onClick={() => handleSeatClick(seat.seatNumber, isAvailable)}
                          disabled={!isAvailable}
                          className={`
                            w-10 h-10 rounded text-xs font-medium
                            ${!isAvailable ? 'bg-gray-400 cursor-not-allowed' : ''}
                            ${isSelected ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : ''}
                            ${isAvailable && !isSelected ? 'bg-green-200 hover:bg-green-300' : ''}
                          `}
                        >
                          {seat.seatNumber}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[var(--tg-theme-button-color)] rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="space-y-3">
        <h3 className="font-semibold">Passenger Details</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={passengerDetails.name}
          onChange={(e) => setLocalPassengerDetails({ ...passengerDetails, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] bg-white text-black"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Age"
            value={passengerDetails.age}
            onChange={(e) => setLocalPassengerDetails({ ...passengerDetails, age: e.target.value })}
            min="1"
            max="120"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] bg-white text-black"
          />
          <select
            value={passengerDetails.gender}
            onChange={(e) => setLocalPassengerDetails({ ...passengerDetails, gender: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] bg-white text-black"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
          <p className="text-sm font-semibold">
            Selected Seats: {selectedSeats.join(', ')}
          </p>
        </div>
      )}

      <button
        onClick={handleProceed}
        disabled={selectedSeats.length === 0}
        className="w-full py-3 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Booking
      </button>
    </div>
  );
}

