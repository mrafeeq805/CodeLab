
import { RouterProvider, createBrowserRouter, useNavigate, useParams } from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Categories';
import MyProjects from './components/MyProjects';
import Favorites from './components/Favorites';
import Latest from './components/Latest';
import ProjectList from './components/ProjectList';
import Description from './components/Description';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SetPassword from './components/SetPassword';
import Profile from './components/Profile';
import EditProfile from './components/EditProfie';
import DeveloperPage from './components/DeveloperPage';
import AddProjectPage from './components/AddProjectPage';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import SearchProjectList from './components/SearchProjectList';
import EditProjectPage from './components/EditProjectPage';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser(user)
				);
        		
			} else {
				dispatch(removeUser());
        		
			}
		});
    return () => unsubscribe()
	}, []);
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Home/>
    },
    {
      path : '/categories',
      element : <Categories/>
    },
    {
      path : '/myprojects',
      element : <MyProjects/>
    },
    {
      path : '/favorites',
      element : <Favorites/>
    },
    {
      path : '/latest',
      element : <Latest/>
    },
    {
      path : '/projects/:category',
      element : <ProjectList/>
    },
    {
      path : '/description/:category/:project_id',
      element : <Description/>
    },
    {
      path : '/signup',
      element : <Signup/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : '/forgotpassword',
      element : <ForgotPassword/>
    },
    {
      path : '/setpassword',
      element : <SetPassword/>
    },
    {
      path : '/profile',
      element : <Profile/>
    },
    {
      path : '/editprofile',
      element : <EditProfile/>
    },
    {
      path : '/developerinfo/:id',
      element : <DeveloperPage/>
    },
    {
      path : '/addproject',
      element : <AddProjectPage/>
    },
    {
      path : '/editproject/:id',
      element : <EditProjectPage/>
    },
    {
      path : '/search/:search',
      element : <SearchProjectList/>
    },
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>

  );
}

export default App;
