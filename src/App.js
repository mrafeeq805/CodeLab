
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Categories';
import MyProjects from './components/MyProjects';
import Favorites from './components/Favorites';
import Latest from './components/Latest';
import ProjectList from './components/ProjectList';
import Description from './components/Description';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
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
      path : '/projects',
      element : <ProjectList/>
    },
    {
      path : '/description',
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
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>

  );
}

export default App;
