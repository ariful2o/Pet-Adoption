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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
