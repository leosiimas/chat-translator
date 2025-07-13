import { Box, Avatar, Paper } from "@mui/material";
import { Translate } from "@mui/icons-material";

export type MessageProps = {
  uid: string;
  sourceLang: string;
  message: string;
  messageTranslated?: string;
  name: string;
  avatar: string;
  date: string;
  isOwner: boolean;
  translateMessage?: (uid: MessageProps) => void;
};

export default function Message({
  uid,
  message,
  sourceLang,
  name,
  avatar,
  date,
  isOwner,
  messageTranslated,
  translateMessage,
}: MessageProps) {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: 3,
        marginBottom: 3,
        flexDirection: isOwner ? "row-reverse" : "row",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{
          width: 60,
          height: 60,
          marginRight: isOwner ? 0 : 2,
          marginLeft: isOwner ? 2 : 0,
        }}
      />

      <Box
        sx={{
          width: "fit-content",
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            marginBottom: 1,
            float: "right",
            alignSelf: isOwner ? "flex-end" : "flex-start",
          }}
        >
          {name} - {date}
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: "10px",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {message}

          {!isOwner && messageTranslated && (
            <>
              <hr />
              <div>{messageTranslated}</div>
            </>
          )}
        </Paper>
      </Box>

      {!isOwner && translateMessage && (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            marginLeft: 1,
            marginRight: 1,
            color: "gray.800",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={() =>
            translateMessage({
              uid,
              sourceLang,
              message,
              name,
              avatar,
              date,
              isOwner,
            })
          }
        >
          <Translate />
        </Box>
      )}
    </Box>
  );
}