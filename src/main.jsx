import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Layout from './Layout.jsx'
import Home from './pages/home.jsx'
import Contact from './pages/contact.jsx'; 
import NotFound from './pages/notfound.jsx'; 

import './index.css'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', Component: Home},
      { path: '/contact', Component: Contact},
      { path: '*', Component: NotFound}
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)