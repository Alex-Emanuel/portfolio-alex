import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from './pages/home.jsx'

import Layout from './Layout.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', Component: Home},
      { path: '/contact', Component: Home},
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)