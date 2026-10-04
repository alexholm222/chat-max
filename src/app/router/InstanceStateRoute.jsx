import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useInstanceState } from "../../entities/instance";
import { useChatList } from "../../entities/chat/model/useChatList";
import { PageLoader } from "../../shared/ui";
const MIN_LOADER_DURATION = 550;

export const InstanceStateRoute = () => {
  const { data, isLoading: isInstanceLoading } = useInstanceState();
  const { isLoading: isChatsLoading } = useChatList();
  const [minDurationPassed, setMinDurationPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDurationPassed(true);
    }, MIN_LOADER_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = isInstanceLoading || isChatsLoading || !minDurationPassed;

  if (isLoading) {
    return <PageLoader />;
  }

  if (
    data?.stateInstance !== "authorized" &&
    data?.stateInstance !== "suspended"
  ) {
    return <Navigate to="/instance-check" replace />;
  }

  return <Outlet />;
};
