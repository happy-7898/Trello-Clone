import "./App.css";
import BoardsPage from "./pages/BoardsPage";
import ListsPage from "./pages/ListsPage";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router";

const router=createBrowserRouter([
  {
    path:"/",
    element:<Navigate to="/boards" replace />,
  },
  {
    path:"/boards",
    element:<BoardsPage />,
  },
  {
    path:"/boards/:id",
    element:<ListsPage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
