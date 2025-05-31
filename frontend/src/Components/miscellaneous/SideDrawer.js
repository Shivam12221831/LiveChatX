import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  Avatar,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Box,
  useMediaQuery,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import ChatLoading from "../ChatLoading";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    enqueueSnackbar("Logout Successful", { variant: "success" });
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      enqueueSnackbar("Please Enter something in search", { variant: "warning" });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to Load the Search Results", { variant: "error" });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setDrawerOpen(false);
    } catch (error) {
      enqueueSnackbar("Error fetching the chat", { variant: "error" });
    }
  };

  const groupedNotifications = notification.reduce((acc, notif) => {
  if (!notif.chat || !notif.chat._id) return acc;

  const chatId = notif.chat._id;
  if (!acc[chatId]) {
    acc[chatId] = { notif, count: 1 };
  } else {
    acc[chatId].count += 1;
  }
  return acc;
  }, {});


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            onClick={() => setDrawerOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              borderRadius: 2,
              px: 2,
              py: 0.8,
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
          >
            <SearchIcon />
            {isLargeScreen && (
              <Typography variant="body1" fontWeight={900} fontFamily={"Work Sans"} >
                Search User
              </Typography>
            )}
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" fontFamily={"Work Sans"} noWrap>
              LiveChatX App
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton onClick={(e) => setNotifAnchorEl(e.currentTarget)}>
              <Badge badgeContent={notification.length} color="error" sx={{'& .MuiBadge-badge': {minWidth: 10, height: 15, fontSize: '0.75rem',}}}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{px: 1.5, py: 0.5, borderRadius: 2}}>
              <Avatar alt={user.name} src={user.pic} sx={{ width: 32, height: 32}}/>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={() => setNotifAnchorEl(null)}
      >
        {!notification.length && <MenuItem>No New Messages</MenuItem>}

        {Object.values(groupedNotifications).map(({ notif, count }) => (
          <MenuItem
            key={notif._id}
            onClick={() => {
              setSelectedChat(notif.chat);
              setNotification(notification.filter((n) => n.chat._id !== notif.chat._id));
              setNotifAnchorEl(null);
            }}
          >
            {notif.chat?.isGroupChat
        ? `New Message in ${notif.chat.chatName}${count > 1 ? ` (${count})` : ""}`
        : `New Message from ${notif.chat?.users ? getSender(user, notif.chat.users) : "Unknown"}${count > 1 ? ` (${count})` : ""}`}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1,
            minWidth: 150,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "& .MuiMenuItem-root": {
              fontFamily: "Work Sans",
              fontSize: 14,
              paddingY: 1,
              paddingX: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => setIsProfileOpen(true)}>My Profile</MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>

      <ProfileModal user={user} open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 350 }} role="presentation">
          <Typography variant="h6" fontFamily={"Work Sans"} fontWeight={"bold"} sx={{ m: 2 }}>Search Users</Typography>
          <Divider />
          <Box sx={{ display: "flex", p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ ml: 1 }}><Typography fontFamily={"Work Sans"}>Go</Typography></Button>
          </Box>
          <List>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <CircularProgress sx={{ display: "flex", mx: "auto" }} />}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideDrawer;
