import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useInstanceStore } from "../../entities/instance";
import {
  startNotificationListener,
  notification$,
} from "../../entities/notifications/model";
import { notificationRouter } from "../services/notificationRouter";
import { useClearQueueNotification } from "../../entities/notifications/model";

interface NotificationsProviderProps {
  children: React.ReactNode;
}

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const instance = useInstanceStore((state) => state.instance);
  const queryClient = useQueryClient();
  const { mutateAsync: clearQueue } = useClearQueueNotification();

  useEffect(() => {
    console.log("NotificationsProvider effect");
    if (!instance) {
      return;
    }
    const controller = new AbortController();

    const subscription = notification$.subscribe((notification) => {
      notificationRouter(notification, queryClient);
    });

    const start = async () => {
      await clearQueue();

      if (controller.signal.aborted) {
        return;
      }

      startNotificationListener({
        idInstance: instance.idInstance,
        apiTokenInstance: instance.apiTokenInstance,
        signal: controller.signal,
      });
    };

    start();

    return () => {
      controller.abort();
      subscription.unsubscribe();
    };
  }, [instance, queryClient]);

  return children;
};
