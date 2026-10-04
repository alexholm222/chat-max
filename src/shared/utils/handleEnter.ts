export const handleEnter = (
  e: React.KeyboardEvent,
  handler: () => void
) => {
  if (e.key !== "Enter" || e.shiftKey) {
    return;
  }

  e.preventDefault();
  handler();
};
