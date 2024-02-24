
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Categories';
import MyProjects from './components/MyProjects';
import Favorites from './components/Favorites';
import Latest from './components/Latest';

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
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>

  );
}

export default App;
