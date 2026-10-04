import "../styles/global.css";
import "simplebar-react/dist/simplebar.min.css";
import "../styles/scrollbar.scss";
import s from "./App.module.scss";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MaxUI } from "@maxhub/max-ui";
import "@maxhub/max-ui/dist/styles.css";
import { router } from "../router/router";
import { NotificationsProvider } from "../Providers/NotificationsProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MaxUI platform="ios" colorScheme="dark">
        <div id="app-container" className={s.container}>
          <NotificationsProvider>
            <RouterProvider router={router} />
          </NotificationsProvider>
        </div>
      </MaxUI>
    </QueryClientProvider>
  );
};

export default App;
