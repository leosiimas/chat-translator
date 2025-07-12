'use client'

import Chat from '@/components/Chat';
import Conversation from '@/components/Conversation';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';

export default function ChatPage() {

   return (
    <Box
      sx={{
       display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          display: "grid",
          gridTemplateRows: "1fr auto",
          height: "100vh",
          maxWidth: 1200,
          width: "100%"
        }}
      >
        <Conversation/>
        <Chat />
      </Paper>
    </Box>
  );
}