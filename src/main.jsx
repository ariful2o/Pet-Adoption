import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  RouterProvider
} from "react-router-dom";
import AuthProvider from './authProvider/AuthProvider';
import './index.css';
import route from './routes/route';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
