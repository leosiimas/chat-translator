"use Client"

import { InsertEmoticon, Send } from "@mui/icons-material"
import { Box, TextField } from "@mui/material"

export default function Chat() {


  return  (
    <Box
      sx={{
        bgcolor: "grey.100",
        p: 2,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}>
      <InsertEmoticon 
        sx={{
          marginRight: '10px',
          fontSize: 30,
          cursor: 'pointer',
          '&:hover': {
            color: 'primary.main', // muda a cor no hover
          },
        }}
      />
      <TextField
        fullWidth
        multiline 
        minRows={1}
        maxRows={5}
        variant="outlined"
        placeholder="Digite sua mensagem..."
      />

      <Send 
        sx={{
          marginLeft: '10px',
          fontSize: 30,
          cursor: 'pointer',
          '&:hover': {
            color: 'primary.main', // muda a cor no hover
          },
        }} />
    </Box>
  )
}