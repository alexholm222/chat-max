import { useQuery } from "@tanstack/react-query";
import { useInstanceStore } from "./useInstanceStore";
import { getInstance } from "../api/instanceApi";

/* type InstanceState =
  | "notAuthorized"
  | "authorized"
  | "blocked"
  | "suspended"
  | "pendingPassword"; */

export const useInstanceState = () => {
  const instance = useInstanceStore((state) => state.instance);

  return useQuery({
    queryKey: ["instance-state", instance?.idInstance],
    queryFn: () => getInstance(instance),
    enabled: Boolean(instance)
  }); 
};
