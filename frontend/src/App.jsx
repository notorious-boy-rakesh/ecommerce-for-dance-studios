import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { ManagementProvider } from './context/ManagementContext';
import ScrollToTop from './components/Common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ManagementProvider>
          <AlertProvider>
            <AppRoutes />
          </AlertProvider>
        </ManagementProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
