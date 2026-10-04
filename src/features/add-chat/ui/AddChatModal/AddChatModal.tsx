import s from "./AddChatModal.module.scss";
import { useState } from "react";
import { useMask } from "@react-input/mask";
import { Dialog } from "radix-ui";
import { Button, Input } from "../../../../shared/ui";
import { ErrorHint } from "../../../../shared/ui/ErrorHint/ErrorHint";
import { useCheckAccount } from "../../../../shared/model";
import { handleEnter } from "../../../../shared/utils";

interface AddChatModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AddChatModal = ({ open, setIsOpen }: AddChatModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notFound, setNotFound] = useState(false);
  const { mutate: сheckAccount, isPending, isError, reset } = useCheckAccount();
  const hintText = notFound
    ? "Номер не найден"
    : isError
    ? "Введен некорректный номер"
    : null;
  const inputRef = useMask({
    mask: "+7 ___ ___ __ __",
    replacement: { _: /\d/ },
    track: ({ inputType, data }) => {
      if (inputType !== "insert" || !data) {
        return data;
      }
      const digits = data.replace(/\D/g, "");
      if (
        digits.length > 1 &&
        (digits.startsWith("7") || digits.startsWith("8"))
      ) {
        return digits.slice(1);
      }

      return data;
    },
  });

  const handleCheckAccount = () => {
    сheckAccount(phoneNumber, {
      onSuccess: (data) => {
        const { exist, chatId } = data;
        if (!exist) {
          setNotFound(true);
          return;
        }

        if (exist && chatId) {
          onOpenChange(false);
        }
      },
    });
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
      setNotFound(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = e.target.value;
    const phoneNumber = maskedValue.replace(/\D/g, "");
    setPhoneNumber(phoneNumber);
    setNotFound(false);
    reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={document.getElementById("app-container")}>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>Найти по номеру</Dialog.Title>
          <Input
            ref={inputRef}
            withClearButton={false}
            onChange={handleChange}
            placeholder="+7 123 456 78 90"
            hint={<ErrorHint isError={isError} text={hintText}  />}
            onKeyDown={(e) => handleEnter(e, handleCheckAccount)}
          />
          <Button
            disabled={false}
            stretched
            children={"Найти в MAX"}
            loading={isPending}
            onClick={handleCheckAccount}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
