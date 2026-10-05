import s from "./AuthForm.module.scss";
import { Input } from "@maxhub/max-ui";
import { Button } from "@maxhub/max-ui";
import { useForm } from "react-hook-form";
import { useLogin } from "../../model/useLogin";
import { ErrorHint } from "../../../../shared/ui";

interface LoginFormData {
  idInstance: string;
  apiTokenInstance: string;
}

export const AuthForm = () => {
  const { mutate: login, isError, reset } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form
      onChange={() => reset()}
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
      <Input
        {...register("idInstance", { required: true, maxLength: 50 })}
        placeholder="Введите idInstance"
        withClearButton
      />

      <Input
        {...register("apiTokenInstance", { required: true, maxLength: 50 })}
        placeholder="Введите apiTokenInstance"
        withClearButton
        hint={
          <ErrorHint
            isError={isError}
            text={isError ? "Введены некоректные данные" : undefined}
          />
        }
      />

      <Button
        disabled={!isValid}
        stretched
        children={"Авторизоваться"}
        loading={false}
      />
    </form>
  );
};
