"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { ref, push, onValue } from "firebase/database";
import { AddReaction, Send } from "@styled-icons/material";

import * as S from "./styled";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const router = useRouter();
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
    if (!user) return;

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
        <S.Main>
          {messages.map((msg, i) => (
            <S.MessageContainer
              key={i}
              $isOwner={msg.user && msg.user.uid === currentUser?.uid}
            >
              <p>
                <strong>{msg.user?.email || "Anônimo"}:</strong>
              </p>
              <S.Message
                $isOwner={msg.user && msg.user.uid === currentUser?.uid}
              >
                {msg.text}
              </S.Message>
            </S.MessageContainer>
          ))}

          <button onClick={() => signOut(auth)}>Sair</button>
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
