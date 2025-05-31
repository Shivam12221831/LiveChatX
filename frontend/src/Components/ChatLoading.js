import { Stack, Skeleton } from "@mui/material";

const ChatLoading = () => {
  return (
    <Stack spacing={1} width="100%">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" animation="wave" height={45} width="100%" sx={{ borderRadius: 2 }} />
      ))}
    </Stack>
  );
};

export default ChatLoading;
