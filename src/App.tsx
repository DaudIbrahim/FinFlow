import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'

const RootLayout = () => (
  <div className="app-root">
    <Outlet />
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
