import s from "./LogoutModal.module.scss";
import { useInstanceStore } from "../../../../entities/instance";
import { Dialog } from "radix-ui";
import { Button } from "../../../../shared/ui";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogoutModal = ({ open, onOpenChange }: LogoutModalProps) => {
  const { deleteInstance } = useInstanceStore((state) => state);
  const handleLogout = () => {
    deleteInstance()
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={document.getElementById("app-container")}>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>Выйти из аккаунта</Dialog.Title>

          <Button
            disabled={false}
            stretched
            children={"Выйти"}
            onClick={handleLogout}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
