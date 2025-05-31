import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

const ProfileModal = ({ user, open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: "32px", fontFamily: "Work Sans", textAlign: "center" }}>
          {user.name}
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, paddingY: 3 }}>
          <Avatar src={user.pic} alt={user.name} sx={{ width: 150, height: 150 }} />
          <Typography variant="h6" sx={{ fontSize: { xs: 22, sm: 26 }, fontFamily: "Work Sans" }}>
            Email: {user.email}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
