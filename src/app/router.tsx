import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import NotFoundPage from "../pages/NotFoundPage";
import ResultPage from "../pages/ResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/game/:id",
    element: <GamePage />,
  },
  {
    path: "/result/:id",
    element: <ResultPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
