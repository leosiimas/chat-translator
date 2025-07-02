"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { ref, push, onValue } from "firebase/database";
import { AddReaction, Send, Logout } from "@styled-icons/material";

import LanguageSelector from "@/components/LaguageSelect";

import * as S from "./styled";

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  if (loading) return <p className="p-4">Carregando...</p>;

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!user || input === "") return;

    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      text: input,
      createdAt: Date.now(),
      user: {
        uid: user.uid,
        email: user.email,
      },
    });
    setInput("");
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>
          <LanguageSelector />
          <S.Exit onClick={() => signOut(auth)}>
            <Logout size={30} />
          </S.Exit>
        </S.Header>
        <S.Main>
          {messages.map(
            (msg, i) =>
              msg.user && (
                <S.MessageContainer
                  key={i}
                  $isOwner={msg.user && msg.user.uid === currentUser?.uid}
                >
                  <S.Message
                    $isOwner={msg.user && msg.user.uid === currentUser?.uid}
                  >
                    <S.MessageOwner>
                      <strong>{msg.user?.email || "Anônimo"}:</strong>
                    </S.MessageOwner>
                    <S.MessageText>{msg.text}</S.MessageText>
                  </S.Message>
                </S.MessageContainer>
              )
          )}
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
