import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      enqueueSnackbar("Please fill all the fields", { variant: "warning" });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      enqueueSnackbar("Login Successful", { variant: "success" });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Invalid Credentials", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const fillGuestCredentials = () => {
    setEmail("guest@example.com");
    setPassword("123456");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      mx="auto"
      mt={4}
      bgcolor="white"
    >
      <FormControl fullWidth required>
        <FormLabel style={{ color: "black", fontFamily: "Work Sans" }}>Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          style={{ color: "black", fontFamily: "Work Sans", marginTop: "2px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth required>
        <FormLabel style={{ color: "black", fontFamily: "Work Sans" }}>Password</FormLabel>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          style={{ color: "black", fontFamily: "Work Sans", marginTop: "2px" }}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submitHandler}
        disabled={loading}
        fontFamily={"Work Sans"}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={fillGuestCredentials}
      >
        Get Guest User Credentials
      </Button>
    </Box>
  );
};

export default Login;
