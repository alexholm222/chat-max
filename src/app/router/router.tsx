import { createBrowserRouter } from "react-router-dom";
import { ChatPage } from "../../pages";
import { Login } from "../../pages";
import { InstanceCheck } from "../../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { InstanceStateRoute } from "./InstanceStateRoute";
import { ChatWindow } from "../../widgets";
export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: "/login", element: <Login /> }],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/instance-check",
        element: <InstanceCheck />,
      },

      {
        element: <InstanceStateRoute />,
        children: [
          {
            path: "/",
            element: <ChatPage />,
            children: [
              {
                path: "/",
                element: <></>,
              },
              {
                path: "/:chatId",
                element: <ChatWindow />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
