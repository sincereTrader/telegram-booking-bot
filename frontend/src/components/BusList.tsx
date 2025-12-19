import { useEffect } from 'react';
import { useAppState } from '../hooks/useAppState';
import { Bus } from '../types';

export default function BusList() {
  const { buses, setCurrentView, setSelectedBus, setLoading, searchParams } = useAppState();

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setLoading(true);
    setCurrentView('seatMap');
  };

  const handleBack = () => {
    setCurrentView('search');
  };

  if (buses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--tg-theme-hint-color)] mb-4">No buses found</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg"
        >
          Search Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          className="text-[var(--tg-theme-link-color)]"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold">Available Buses</h2>
        <div></div>
      </div>

      {searchParams && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
          <p className="text-sm">
            <span className="font-semibold">{searchParams.source}</span> →{' '}
            <span className="font-semibold">{searchParams.destination}</span>
          </p>
          <p className="text-xs text-[var(--tg-theme-hint-color)] mt-1">
            {new Date(searchParams.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSelectBus(bus)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{bus.operator}</h3>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">{bus.busType}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[var(--tg-theme-hint-color)]">
                  {bus.availableSeats} seats available
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-lg font-semibold">{bus.departureTime}</p>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">Departure</p>
              </div>
              <div className="flex-1 mx-4 text-center">
                <p className="text-xs text-[var(--tg-theme-hint-color)]">{bus.duration}</p>
                <div className="border-t border-gray-300 my-1"></div>
              </div>
              <div>
                <p className="text-lg font-semibold">{bus.arrivalTime}</p>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">Arrival</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

