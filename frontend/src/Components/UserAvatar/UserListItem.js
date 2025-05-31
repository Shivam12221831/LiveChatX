import { Avatar, Box, Typography, Paper } from "@mui/material";

const UserListItem = ({ user, handleFunction }) => {

  return (
    <Paper
      onClick={handleFunction}
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#E8E8E8",
        px: 2,
        py: 1,
        mb: 1,
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#38B2AC",
          color: "white",
        },
      }}
    >
      <Avatar
        sx={{ mr: 2 }}
        alt={user.name}
        src={user.pic}
      />
      <Box>
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="caption">
          <strong>Email:</strong> {user.email}
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserListItem;
