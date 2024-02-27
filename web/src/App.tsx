import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { AuthPage } from './pages/AuthPage/AuthPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <TodoPage />
      </PrivateRoute>
    )
  },
  {
    path: "/auth",
    element: <AuthPage />
  }
]);


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
