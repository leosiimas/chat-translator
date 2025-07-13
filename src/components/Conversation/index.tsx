import { Box } from "@mui/material";

import Message, { MessageProps } from "../Message";

type ConversationProps = {
  messages: MessageProps[];
};

export default function Conversation({ messages }: ConversationProps) {
  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        p: 2,
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        overflowY: "scroll",
      }}
    >
      {messages.map((msg, i) => (
        <Message key={i} {...msg} />
      ))}
    </Box>
  );
}
