import { Add } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      enqueueSnackbar("Failed to Load the chats", {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ xs: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={2}
      mr={1}
      bgcolor="white"
      width={{ xs: "100%", md: "31%" }}
      height="84vh"
      borderRadius={2}
      border={1}
      borderColor="grey.300"
    >
      <Box
        pb={2}
        px={2}
        fontSize={{ xs: "22px", md: "26px" }}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" fontFamily="Work Sans">
          My Chats
        </Typography>
        <GroupChatModal>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            sx={{
              fontSize: { xs: 14, md: 15, lg: 15 },
              backgroundColor: "rgb(237, 242, 247)",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              color: "#000",
              "&:hover": {
                backgroundColor: "#e2e8f0",
              },
            }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        p={2}
        bgcolor="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius={2}
        overflow="hidden"
      >
        {loading ? (
          <ChatLoading />
        ) :!loggedUser ? (
          <></>
        ) : (
          <Stack
            spacing={1}
            sx={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              flex: 1,
            }}
          >
            {chats.map((chat) => (
              <Paper
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                elevation={2}
                sx={{
                  p: 1,
                  px: 2,
                  borderRadius: 2,
                  bgcolor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  cursor: "pointer",
                }}
              >
                <Typography variant="subtitle1" fontFamily={"Work Sans"}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
                {chat.latestMessage && (
                  <Typography variant="caption" fontFamily={"Work Sans"}>
                    <strong>{chat.latestMessage.sender.name}:</strong>{" "}
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
