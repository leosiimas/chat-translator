import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

import Message, { MessageProps } from "../Message";

type ConversationProps = {
  messages: MessageProps[];
};

export default function Conversation({ messages }: ConversationProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        p: 2,
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        overflowY: "scroll",
        height: "100%", // ou uma altura fixa, tipo "400px"
      }}
    >
      {messages.map((msg, i) => (
        <Message key={i} {...msg} />
      ))}
      <div ref={endRef} />
    </Box>
  );
}
