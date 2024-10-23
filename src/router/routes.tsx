import { lazy } from "react";

// ** Pages
import ErrorPage from "@/pages/Error/ErrorPage";

// ** Routes packages
import { RouteObject } from "react-router-dom";

// ** render components as a lazy load component
const App = lazy(() => import("../App"));

const GameBoardPage = lazy(() => import("../pages/game/GameBoardPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <GameBoardPage /> }],
  },
];

export default routes;
