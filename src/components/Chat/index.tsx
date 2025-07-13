"use Client"

import { useTranslations } from "next-intl";
import { useState } from "react";

import { InsertEmoticon, Send } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";

import { useUser } from "@/app/providers/user-provider";

export default function Chat() {
  const [message, setMessage] = useState("");

  const t = useTranslations();
  const { user } = useUser();

  const sendMessage = async () => {
    if (message === "") return;

    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      text: message,
      lang: user?.userLang,
      traductions: {
        ko: user?.userLang === "ko" ? message : "",
        pt: user?.userLang === "pt" ? message : "",
      },
      user: {
        uid: user?.user?.uid,
        email: user?.user?.uid,
      },
      createdAt: Date.now(),
    });
    setMessage("");
  };

  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        p: 2,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <InsertEmoticon
        sx={{
          marginRight: "10px",
          fontSize: 30,
          cursor: "pointer",
          "&:hover": {
            color: "primary.main",
          },
        }}
      />
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={5}
        variant="outlined"
        placeholder={t("typeAMessage")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Send
        onClick={() => sendMessage()}
        sx={{
          marginLeft: "10px",
          fontSize: 30,
          cursor: "pointer",
          color: message !== "" ? "primary.main" : "primary.secondary",
          "&:hover": {
            color: "primary.main",
          },
        }}
      />
    </Box>
  );
}