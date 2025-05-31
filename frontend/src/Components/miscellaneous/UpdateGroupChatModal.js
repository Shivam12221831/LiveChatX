import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to Load the Search Results", { variant: "error" });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "/api/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      enqueueSnackbar("Chat Renamed Successfully", { variant: "success" });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      enqueueSnackbar("User already in group!", { variant: "error" });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      enqueueSnackbar("Only admins can add someone!", { variant: "error" });
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      enqueueSnackbar("User Added Successfully", { variant: "success" });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      enqueueSnackbar("Only admins can remove someone!", { variant: "error" });
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      enqueueSnackbar("User Removed Successfully", { variant: "success" });
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VisibilityIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h5" textAlign="center">{selectedChat.chatName}</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Box>

          <Box display="flex" alignItems="center" mb={2} gap={1}>
            <TextField
              label="Chat Name"
              fullWidth
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{height: 53, width: 100}}
              size="large"
              onClick={handleRename}
              disabled={renameloading}
            >
              {renameloading ? <CircularProgress size={24} /> : "Update"}
            </Button>
          </Box>

          <TextField
            label="Add user to group"
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ mb: 2 }}
          />

          {loading ? (
            <Box mt={2} textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
        </DialogContent>

        <DialogActions>
          <Button sx={{backgroundColor: "#d32f2f", color: "white"}} onClick={() => handleRemove(user)}>
            Leave Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateGroupChatModal;
