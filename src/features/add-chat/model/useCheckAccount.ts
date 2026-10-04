import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkAccount } from "../../../shared/api";
import { useInstanceStore } from "../../../entities/instance";

export const useCheckAccount = () => {
  const { instance } = useInstanceStore((state) => state);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (phoneNumber: string) =>
      checkAccount({ ...instance, phoneNumber }),
    onSuccess: (data) => {
      const { exist, chatId } = data;
      if (exist && chatId) {
        navigate(`/${chatId}`);
        return 'success'
      }
    },
  });
};
