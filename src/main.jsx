import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  RouterProvider
} from "react-router-dom";
import AuthProvider from './authProvider/AuthProvider';
import './index.css';
import route from './routes/route';

// Create a client
const queryClient = new QueryClient();
const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider context={helmetContext}>
          <RouterProvider router={route} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
