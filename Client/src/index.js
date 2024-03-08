import {
	RouterProvider,
	createBrowserRouter,
	useNavigate,
	useParams,
	Outlet,
} from "react-router-dom";
import './index.css';
import Home from "./components/Home";
import Categories from "./components/Categories";
import MyProjects from "./components/MyProjects";
import Favorites from "./components/Favorites";
import Latest from "./components/Latest";
import ProjectList from "./components/ProjectList";
import Description from "./components/Description";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SetPassword from "./components/SetPassword";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfie";
import DeveloperPage from "./components/DeveloperPage";
import AddProjectPage from "./components/AddProjectPage";
import { Provider, useDispatch } from "react-redux";
import SearchProjectList from "./components/SearchProjectList";
import EditProjectPage from "./components/EditProjectPage";
import NotFound from "./components/NotFound";
import appStore from "./utils/appStore";
import ReactDOM from 'react-dom/client';
import useGetOnlineStatus from "./hooks/useOnlineStatus";
import NoInternet from "./components/NoInternet";

const App = () => {

  const status = useGetOnlineStatus()
	
	return (
		<Provider store={appStore}>
			
				<div className="app">
          {status === "Online" ? <Outlet /> : <NoInternet/>}	
				</div>
		</Provider>
	);
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/myprojects",
        element: <MyProjects />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/latest",
        element: <Latest />,
      },
      {
        path: "/projects/:category",
        element: <ProjectList />,
      },
      {
        path: "/description/:category/:project_id",
        element: <Description />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/setpassword",
        element: <SetPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
      {
        path: "/developerinfo/:id",
        element: <DeveloperPage />,
      },
      {
        path: "/addproject",
        element: <AddProjectPage />,
      },
      {
        path: "/editproject/:id",
        element: <EditProjectPage />,
      },
      {
        path: "/search/:search",
        element: <SearchProjectList />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router}/>)
