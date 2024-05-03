import './App.css'
import { Bank } from './pages/Bank';
import { Customer } from './pages/Customer';
import { Dashboard } from './pages/Dashboard';
import { Doctor } from './pages/Doctor';
import { HomePage } from './pages/HomePage'
import { Hospital } from './pages/Hospital';
import { InsuranceProvider } from './pages/InsuranceProvider';
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/customer',
      element: <Customer/>
    },
    {
      path: '/InsuranceProvider',
      element: <InsuranceProvider/>
    },
    {
      path: '/bank',
      element: <Bank/>
    },
    {
      path: '/hospital',
      element: <Hospital/>
    },
    {
      path: '/doctor',
      element: <Doctor/>
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    }
  ])
  return (
    <main >
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
