import { useGetContactInfo } from "../../model/useGetContactInfo";
import { CellSimple, Avatar } from "../../../../shared/ui";
import { SkeletonWrapper, Skeleton } from "../../../../shared/ui";

export const Contact = ({ chatId }) => {
  const { data, isError, isLoading } = useGetContactInfo(chatId);

  const subtitle =
    isError && !isLoading
      ? "Информация о контакте недоступна"
      : !isLoading
      ? `был в сети недавно`
      : "";
  return (
    <CellSimple
      surface={"default"}
      before={
        !isError &&
        !isLoading && (
          <Avatar.Container size={40}>
            <SkeletonWrapper
              isLoading={isLoading}
              skeleton={<Skeleton width={40} height={40} borderRadius={50} />}
            >
              <Avatar.Image src={data?.avatar} />
            </SkeletonWrapper>
          </Avatar.Container>
        )
      }
      title={data?.name}
      subtitle={subtitle}
    />
  );
};
