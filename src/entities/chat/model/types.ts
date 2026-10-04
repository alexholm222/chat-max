export interface Chat {
  chatId: string;
  name: string;
  type: "user" | "group" | "channel" | "bot";
  phoneNumber: number;
  unreadCount?: number;
}
