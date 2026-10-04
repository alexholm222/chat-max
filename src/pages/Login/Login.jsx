import s from "./Login.module.scss";
import { AuthForm } from "../../features/auth";
export const Login = () => {
  return (
    <div className={s.authPage}>
      <div className={s.container}>
        <AuthForm />
      </div>
    </div>
  );
};
