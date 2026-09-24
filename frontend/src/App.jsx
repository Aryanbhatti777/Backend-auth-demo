import { createBrowserRouter, RouterProvider } from "react-router"
import Register from "./pages/Register";
import Profile from "./pages/Profile";


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register/>
    },
    {
      path: "/profile",
      element: <Profile/>
    }
  ]);



  return (

    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
