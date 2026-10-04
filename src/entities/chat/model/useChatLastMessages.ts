import { useQuery } from "@tanstack/react-query";
import {
  getLastIncomingMessages,
  getLastOutgoingMessages,
} from "../api/chatApi";
import { useInstanceStore } from "../../instance";
import { requestQueue } from "../../../shared/model";

export const useChatLastMessages = () => {
  const { instance } = useInstanceStore((state) => state);

  return useQuery({
    queryKey: ["chat-last-messages", instance?.idInstance],

    queryFn: async ({ signal }) => {
      const [incoming, outgoing] = await Promise.all([
        requestQueue.add(() =>
          getLastIncomingMessages({
            ...instance,
            signal,
          }),
        ),
        requestQueue.add(() =>
          getLastOutgoingMessages({
            ...instance,
            signal,
          }),
        ),
      ]);

      return [...incoming, ...outgoing];
    },

    retry: false,
    staleTime: 60 * 60 * 1000,

    select: (messages) => {
      const result = new Map();

      for (const message of messages) {
        const current = result.get(message.chatId);

        if (!current || message.timestamp > current.timestamp) {
          result.set(message.chatId, message);
        }
      }

      return result;
    },
  });
};