import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useInstanceStore } from "../../entities/instance";
import { startNotificationListener, notification$ } from "../../shared/api";
import { notificationRouter } from "../services/notificationRouter";

interface NotificationsProviderProps {
  children: React.ReactNode;
}

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const instance = useInstanceStore((state) => state.instance);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!instance) {
      return;
    }
    const controller = new AbortController();

    const subscription = notification$.subscribe((notification) => {

      notificationRouter(notification, queryClient);
    });

    startNotificationListener({
      idInstance: instance.idInstance,
      apiTokenInstance: instance.apiTokenInstance,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
      subscription.unsubscribe();
    };
  }, [instance, queryClient]);

  return children;
};
