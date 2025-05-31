import { useState } from 'react'
import { Box } from '@mui/material'
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../Components/miscellaneous/SideDrawer'
import MyChats from '../Components/MyChats'
import ChatBox from '../Components/ChatBox'

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{height: "100vh", width: "100%" }}>
      {user && <SideDrawer/>}
      <Box
        display={'flex'}
        justifyContent="space-between"
        w="100%"
        h="100%"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chatpage