import { Navigate } from "react-router-dom";
import { useInstanceStore } from "../../entities/instance";
import { useInstanceState } from "../../entities/instance";
import { useChatList } from "../../entities/chat/model/useChatList";
import { Button } from "../../shared/ui";

export const InstanceCheck = () => {
  const { data, isLoading: isInstanceLoading, isError } = useInstanceState();
  const deleteInstance = useInstanceStore((state) => state.deleteInstance);
  const { isLoading: isChatsLoading } = useChatList();

  if (isInstanceLoading || isChatsLoading) {
    return <p>Получаем статус инстанса</p>;
  }

  if (isError) {
    return <p>ошибка</p>;
  }

  if (
    data.stateInstance === "authorized" ||
    data.stateInstance === "suspended"
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <p>{data.stateInstance}</p>
      <Button
        onClick={deleteInstance}
        stretched
        children={"Вернуться"}
        loading={false}
      />
    </div>
  );
};
