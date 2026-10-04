import { useState } from "react";
import s from "./Logout.module.scss";
import IconLogout from "./assets/iconLogo.svg?react";
import { LogoutModal } from "./LogoutModal/LogoutModal";

export const Logout = () => {
  const [modalLogout, setModalLogout] = useState(false);
  return (
    <>
      <IconLogout className={s.logout} onClick={() => setModalLogout(true)} />
      <LogoutModal open={modalLogout} onOpenChange={setModalLogout} />
    </>
  );
};
