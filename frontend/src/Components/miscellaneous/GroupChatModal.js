import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { user, chats, setChats } = ChatState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((u) => u._id === userToAdd._id)) {
      enqueueSnackbar("User already added", { variant: "warning" });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to load search results", { variant: "error" });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      enqueueSnackbar("New Group Chat Created!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`Failed to create chat: ${error.response.data}`, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <span onClick={handleOpen} style={{ cursor: "pointer" }}>
        {children}
      </span>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: 28, fontFamily: "Work Sans", textAlign: "center" }}>
          Create Group Chat
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            label="Chat Name"
            fullWidth
            margin="normal"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />

          <TextField
            label="Add Users eg: John, Piyush, Jane"
            fullWidth
            margin="normal"
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
            {selectedUsers.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleDelete(user)}
              />
            ))}
          </Box>

          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : (
            searchResult.slice(0, 4).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Chat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupChatModal;
