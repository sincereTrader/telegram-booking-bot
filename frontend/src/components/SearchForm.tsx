import { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { apiService } from '../services/api';

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
];

export default function SearchForm() {
  const { setCurrentView, setBuses, setSearchParams, setLoading, setError } = useAppState();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!source || !destination || !date) {
      setError('Please fill in all fields');
      return;
    }

    if (source === destination) {
      setError('Source and destination cannot be the same');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const buses = await apiService.searchBuses(source, destination, date);
      setSearchParams({ source, destination, date });
      setBuses(buses);
      setCurrentView('busList');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to search buses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">🚌 Book Your Bus</h1>
        <p className="text-[var(--tg-theme-hint-color)]">Search and book buses easily</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="source" className="block text-sm font-medium mb-2">
            From
          </label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] bg-white text-black"
            required
          >
            <option value="">Select source city</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium mb-2">
            To
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] bg-white text-black"
            required
          >
            <option value="">Select destination city</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Travel Date
          </label>
          <input
            type="date"
            id="date"
            value={date || defaultDate}
            onChange={(e) => setDate(e.target.value)}
            min={defaultDate}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] bg-white text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Search Buses
        </button>
      </form>
    </div>
  );
}

