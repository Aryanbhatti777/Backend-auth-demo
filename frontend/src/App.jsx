import { createBrowserRouter, RouterProvider } from "react-router"
import Register from "./pages/Register";


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register/>
    }
  ]);



  return (

    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
