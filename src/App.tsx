import { Toaster } from 'react-hot-toast';
import { AppQueryProvider } from '@/context/QueryProvider';
import { AppRouter } from '@/routes/AppRouter';

function App() {
  return (
    <AppQueryProvider>
      <AppRouter />
      <Toaster position="top-right" />
    </AppQueryProvider>
  );
}

export default App;
