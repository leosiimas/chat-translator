import { Box, Avatar, Paper, CircularProgress } from "@mui/material";
import { Translate } from "@mui/icons-material";
import { useState } from "react";

export type MessageProps = {
  uid: string;
  sourceLang: string;
  message: string;
  messageTranslated?: string;
  name: string;
  avatar: string;
  date: string;
  isOwner: boolean;
  translateMessage?: (uid: MessageProps) => Promise<boolean>;
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
  const [loading, setLoading] = useState(false);

  const dateTimeFormat = (timestemp: string): string => {
    const date = new Date(timestemp);

    const formatter = new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formatter.format(date).replace(",", "");
  };

  const handleTranslate = async () => {
    setLoading(true);

    if (translateMessage) {
      await translateMessage({
        uid,
        sourceLang,
        message,
        name,
        avatar,
        date,
        isOwner,
      });
    }

    setLoading(false);
  };

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
            fontSize: 15,
          }}
        >
          {name} - {dateTimeFormat(date)}
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: "12px",
            wordBreak: "break-word",
            whiteSpace: "normal",
            fontSize: 18,
            borderRadius: 4,
          }}
        >
          {message}

          {!isOwner && messageTranslated && (
            <>
              <Box
                component="hr"
                sx={{
                  border: "none",
                  borderTop: "1px dotted #0c0b0b",
                  my: 2,
                }}
              />
              <Box>{messageTranslated}</Box>
            </>
          )}
        </Paper>
      </Box>

      {!isOwner &&
        translateMessage &&
        (loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            <CircularProgress size={15} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            <Translate
              onClick={() => handleTranslate()}
              sx={{
                fontSize: 18,
                color: "gray.800",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            />
          </Box>
        ))}
    </Box>
  );
}
