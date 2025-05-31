import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Chip
      label={
        admin === user._id ? `${user.name} (Admin)` : user.name
      }
      onClick={handleFunction}
      onDelete={handleFunction}
      deleteIcon={<CloseIcon />}
      sx={{
        m: 0.5,
        fontSize: "0.75rem",
        backgroundColor: "#9c27b0",
        color: "white",
        "& .MuiChip-deleteIcon": {
          color: "white",
        },
        "&:hover": {
          backgroundColor: "#7b1fa2",
        },
      }}
    />
  );
};

export default UserBadgeItem;
