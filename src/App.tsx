import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import TransactionList from "./pages/Dashboard/TransactionList";

const RootLayout = () => (
  <div className="app-root">
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "list",
        element: <TransactionList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
