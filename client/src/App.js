import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClubAdmin from "./pages/ClubAdmin";
import ClubMember from "./pages/ClubMember";
import AddEvent from "./pages/Event"
import './Styles.scss'
import ImageUploadForm from "./components/Image";
import EditEvent from "./pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/member/:srn", 
    element: <ClubMember />,
  },
  {
    path: "/admin/:clubname", 
    element: <ClubAdmin />,
  },
  {
    path: "/upload", 
    element: <ImageUploadForm />,
  },
  {
    path: ":clubname/event", 
    element: <AddEvent />,
  },
  {
    path: ":clubname/:eventname/edit", 
    element: <EditEvent />,
  },

]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
