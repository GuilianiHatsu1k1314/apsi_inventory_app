import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import './index.css'
import LoginPage from './pages/LoginPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <div>404 not found</div>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
