import { Avatar, Tooltip, Box, Typography } from "@mui/material";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef } from "react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <ScrollToBottom
      className="chat-box"
      style={{ height: "400px", overflowY: "auto", paddingBottom: "5px" }}
    >
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" alignItems="flex-end" justifyContent={m.sender._id === user._id ? "flex-end" : "flex-start"} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                <Avatar
                  sx={{
                    mt: "7px",
                    mr: 1,
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  alt={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <Typography
              sx={{
                backgroundColor:
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 0.5 : 1.25,
                fontFamily: "Work Sans",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                display: "inline-block",
              }}
            >
              {m.content}
            </Typography>
          </Box>
        ))}
      <div ref={bottomRef} />
    </ScrollToBottom>
  );
};

export default ScrollableChat;
