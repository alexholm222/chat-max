import { useInstanceStore } from "../../../entities/instance/model/useInstanceStore";
import { useMutation } from "@tanstack/react-query";
import { getInstance } from "../../../entities/instance/api/instanceApi";

export const useLogin = () => {
  const { setInstance } = useInstanceStore((state) => state);

  return useMutation({
    mutationFn: getInstance,

    onSuccess: (_, credentials) => {
      setInstance({
        idInstance: credentials.idInstance,
        apiTokenInstance: credentials.apiTokenInstance,
      });
    },
  });
};
