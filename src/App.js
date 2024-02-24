
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Categories from './components/Categories';

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
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>

  );
}

export default App;
