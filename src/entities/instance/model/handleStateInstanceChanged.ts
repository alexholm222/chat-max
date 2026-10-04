import type { QueryClient } from "@tanstack/react-query";

export const handleStateInstanceChanged = (
  notification,
  queryClient: QueryClient
) => {
  const { idInstance } = notification.instanceData;

  queryClient.setQueryData(
    ["instance-state", idInstance],
    notification.stateInstance
  );
};
