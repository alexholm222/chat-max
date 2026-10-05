import { Avatar } from "../../../../shared/ui";
import { useChatAvatar } from "../../model/useChatAvatar";
import { SkeletonWrapper } from "../../../../shared/ui";
import { Skeleton } from "../../../../shared/ui";

interface ChatAvatarProps {
  chatId: string;
  size: number;
}

export const ChatAvatar = ({ chatId, size }: ChatAvatarProps) => {
  const { data, isLoading } = useChatAvatar(chatId);

  return (
    <Avatar.Container size={size} style={{ flexShrink: "0" }}>
      <SkeletonWrapper
        isLoading={isLoading}
        skeleton={<Skeleton width={56} height={56} borderRadius={50} />}
      >
        <Avatar.Image src={data?.urlAvatar} />
      </SkeletonWrapper>
    </Avatar.Container>
  );
};
