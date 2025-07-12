import { Box, Avatar, Paper } from "@mui/material";

export type MessageProps = {
  message: string
  name: string
  avatar: string
  date: string
  isOwner: boolean
}

export default function Message({
 message,
 name,
 avatar,
 date,
 isOwner
}: MessageProps) {

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: 3,
        marginBottom: 3,
        flexDirection: isOwner ?  'row-reverse' : 'row'
      }}
    >
      <Avatar 
        alt="Remy Sharp" 
        src={avatar} 
        sx={{
          width: 60, height: 60,
          marginRight: isOwner ? 0 : 2,
          marginLeft: isOwner ? 2 : 0
        }} 
      />
      <Box
        sx={{
          width: 'fit-content',
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >          
        <Box
          sx={{
            marginBottom: 1,
            float: 'right',
            alignSelf: isOwner ? 'flex-end' : 'flex-start',
          }}
        >
          {name} - {date}
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: '10px',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
          }}
        >
         {message}
        </Paper>
      </Box>
    </Box>
  )
}