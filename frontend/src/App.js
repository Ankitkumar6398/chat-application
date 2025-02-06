import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";


const router = createBrowserRouter([
    {
        path: '/',
        element:<HomePage/>
    },
    {
        path: '/register',
        element:<Signup/>
    },
    {
        path: '/login',
        element:<Login/>
    }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
