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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const postDetails = (file) => {
    setLoading(true);
    if (!file) {
      enqueueSnackbar("Please select an image", { variant: "warning" });
      setLoading(false);
      return;
    }
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mern-chat");
      data.append('folder', 'chat-app');
      data.append("cloud_name", "dyp00beat");
      fetch("https://api.cloudinary.com/v1_1/dyp00beat/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      enqueueSnackbar("Please select a valid image format (jpeg/png)", {
        variant: "warning",
      });
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      enqueueSnackbar("Please fill all the fields", { variant: "warning" });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      setLoading(false);
      return;
    }
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      enqueueSnackbar("Registration Successful", { variant: "success" });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      enqueueSnackbar(error.response.data.message || "Error occurred", {
        variant: "error",
      });
      setLoading(false);
    }
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
      <FormControl fullWidth required >
        <FormLabel style={{ color: "black", fontFamily: "Work Sans" }}>Name</FormLabel>
        <Input style={{ color: "black", fontFamily: "Work Sans", marginTop: "2px" }}  value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
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
          autoComplete="new-password"
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
      <FormControl fullWidth required>
        <FormLabel style={{ color: "black", fontFamily: "Work Sans" }}>Confirm Password</FormLabel>
        <Input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          autoComplete="new-password"
          style={{ color: "black", fontFamily: "Work Sans", marginTop: "2px" }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel style={{ color: "black", fontFamily: "Work Sans" }}>Upload Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          style={{ color: "black", fontFamily: "Work Sans", marginTop: "8px" }}
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submitHandler}
        disabled={loading}
        fontFamily={'Work Sans'}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUp;
