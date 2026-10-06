import { Subject } from "rxjs";
import { deleteNotification } from "../api/deleteNotification";
import { receiveNotification } from "../api/receiveNotification";
import type { Notification } from "./type";

export const notification$ = new Subject<Notification>();

interface StartNotificationListenerParams {
  idInstance: string;
  apiTokenInstance: string;
  signal: AbortSignal;
}

export const startNotificationListener = async ({
  idInstance,
  apiTokenInstance,
  signal,
}: StartNotificationListenerParams) => {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification({
        idInstance,
        apiTokenInstance,
        receiveTimeout: 30,
        signal,
      });

      if (!notification) {
        continue;
      }

      await deleteNotification({
        idInstance,
        apiTokenInstance,
        receiptId: notification.receiptId,
      });

      notification$.next(notification);
    } catch (error) {
      if (signal.aborted) {
        break;
      }

      console.error("Notification listener error:", error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
