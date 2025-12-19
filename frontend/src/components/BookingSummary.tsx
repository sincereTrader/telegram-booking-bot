import { useEffect, useCallback } from 'react';
import { useAppState } from '../hooks/useAppState';
import { apiService } from '../services/api';
import { useTelegram } from '../hooks/useTelegram';

export default function BookingSummary() {
  const {
    selectedBus,
    selectedSeats,
    passengerDetails,
    setBooking,
    booking,
    setLoading,
    setError,
    searchParams,
  } = useAppState();
  const { showAlert } = useTelegram();

  const handleReserveBooking = useCallback(async () => {
    if (!selectedBus || selectedSeats.length === 0 || !passengerDetails) {
      setError('Missing booking information');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingData = await apiService.reserveBooking(
        selectedBus.id,
        selectedSeats,
        passengerDetails,
        searchParams?.source,
        searchParams?.destination,
        searchParams?.date
      );
      setBooking(bookingData);
      showAlert('Booking reserved successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reserve booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedBus, selectedSeats, passengerDetails, searchParams, setBooking, setLoading, setError, showAlert]);

  useEffect(() => {
    if (selectedBus && selectedSeats.length > 0 && passengerDetails && !booking) {
      handleReserveBooking();
    }
  }, [selectedBus, selectedSeats, passengerDetails, booking, handleReserveBooking]);

  const handleNewBooking = () => {
    window.location.reload(); // Reset app state
  };

  if (!selectedBus || !booking) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--tg-theme-hint-color)]">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">✅</div>
        <h2 className="text-2xl font-bold mb-2">Booking Reserved!</h2>
        <p className="text-[var(--tg-theme-hint-color)]">
          Your booking has been successfully reserved
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-3">
        <div>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">Booking ID</p>
          <p className="font-semibold">{booking.bookingId}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">Operator</p>
          <p className="font-semibold">{selectedBus.operator}</p>
        </div>

        {searchParams && (
          <>
            <div>
              <p className="text-sm text-[var(--tg-theme-hint-color)]">Route</p>
              <p className="font-semibold">
                {searchParams.source} → {searchParams.destination}
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--tg-theme-hint-color)]">Travel Date</p>
              <p className="font-semibold">
                {new Date(searchParams.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </>
        )}

        <div>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">Departure Time</p>
          <p className="font-semibold">{selectedBus.departureTime}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">Selected Seats</p>
          <p className="font-semibold">{selectedSeats.join(', ')}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">Status</p>
          <p className="font-semibold capitalize">{booking.status}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--tg-theme-hint-color)]">Expires At</p>
          <p className="font-semibold">
            {new Date(booking.expiresAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
        <p className="text-sm">
          ⚠️ <strong>Note:</strong> This is a reservation. Complete payment to confirm your booking.
          Your reservation expires in 15 minutes.
        </p>
      </div>

      <button
        onClick={handleNewBooking}
        className="w-full py-3 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Book Another Bus
      </button>
    </div>
  );
}

