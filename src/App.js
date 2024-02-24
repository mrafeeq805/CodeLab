
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Categories';
import MyProjects from './components/MyProjects';

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
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>

  );
}

export default App;
