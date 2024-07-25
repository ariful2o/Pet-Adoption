import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import AuthProvider from './authProvider/AuthProvider';
import './index.css';
import route from './routes/route';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </React.StrictMode>,
)
