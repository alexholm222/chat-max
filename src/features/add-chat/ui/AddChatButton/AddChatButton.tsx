import { useState } from "react";
import { IconButton } from "../../../../shared/ui";
import { AddChatModal } from "../AddChatModal/AddChatModal";
import iconPlus from "../assets/iconPlus.svg";

export const AddChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        size="xsmall"
        aria-label="Название кнопки"
      >
        <img src={iconPlus}></img>
      </IconButton>
      <AddChatModal open={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
