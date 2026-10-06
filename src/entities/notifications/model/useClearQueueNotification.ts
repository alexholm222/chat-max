import { clearQueueNotification } from "../api/clearQueueNotification";
import { useMutation } from "@tanstack/react-query";
import { useInstanceStore } from "../../instance";

export const useClearQueueNotification = () => {
  const instance = useInstanceStore((state) => state.instance);

  return useMutation({
    mutationFn: async () => {
      if (!instance?.idInstance || !instance.apiTokenInstance) {
        throw new Error("Instance empty");
      }

      return clearQueueNotification({
        idInstance: instance.idInstance,
        apiTokenInstance: instance.apiTokenInstance,
      });
    },
  });
};
