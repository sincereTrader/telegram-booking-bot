import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/sdk';
import { AppProvider } from './context/AppContext';
import SearchForm from './components/SearchForm';
import BusList from './components/BusList';
import SeatMap from './components/SeatMap';
import BookingSummary from './components/BookingSummary';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useAppState } from './hooks/useAppState';

function AppContent() {
  const { currentView, loading, error, setError } = useAppState();

  return (
    <div className="min-h-screen bg-[var(--tg-theme-bg-color)] text-[var(--tg-theme-text-color)]">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            {currentView === 'search' && <SearchForm />}
            {currentView === 'busList' && <BusList />}
            {currentView === 'seatMap' && <SeatMap />}
            {currentView === 'bookingSummary' && <BookingSummary />}
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Telegram WebApp
    WebApp.ready();
    WebApp.expand();
    
    // Apply Telegram theme
    const theme = WebApp.themeParams;
    document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000000');
    document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color || '#999999');
    document.documentElement.style.setProperty('--tg-theme-link-color', theme.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color || '#ffffff');

    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

