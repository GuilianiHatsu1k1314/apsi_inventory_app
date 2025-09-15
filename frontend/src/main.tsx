import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import InventoryAppPage from './pages/InventoryAppPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/app',
    element: <InventoryAppPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
