"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, push, onValue } from "firebase/database";
import { AddReaction, Send } from "@styled-icons/material";

import * as S from "./styled";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgs = Object.values(data);
        setMessages(msgs);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = () => {
    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      text: input,
      createdAt: Date.now(),
    });
    setInput("");
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Main>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
        </S.Main>
        <S.Chat>
          <AddReaction size={30} />
          <S.TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            type="text"
            placeholder="Digite uma mensagem"
          />
          <Send size={30} onClick={sendMessage} />
        </S.Chat>
      </S.Container>
    </S.Wrapper>
  );
}
