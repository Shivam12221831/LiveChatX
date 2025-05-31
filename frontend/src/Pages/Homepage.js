import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Tabs, Tab } from '@mui/material';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/Signup';

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  },[navigate]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={3}
          bgcolor="white"
          width={400}
          height={10}
          margin="40px 0 15px 0"
          borderRadius={3}             
          border="1px solid lightgray" 
        >
          <Typography fontFamily={'Work Sans'} fontSize={25} color='black'>LiveChatX App</Typography>
        </Box>
        <Box
          bgcolor={'white'}
          width={400}
          padding={3}
          color={'black'}
          borderRadius={3}             
          border="1px solid lightgray" 
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Login and SignUp Tabs"
          >
            <Tab label="Login" sx={{ color: 'black', fontFamily: 'Work Sans' }} />
            <Tab label="Sign Up" sx={{ color: 'black', fontFamily: 'Work Sans' }} />
          </Tabs>

          <Box mt={3}>
            {value === 0 && <Login />}
            {value === 1 && <SignUp />}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Homepage;
