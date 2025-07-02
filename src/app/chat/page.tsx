"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  useEffect(() => {
    const fetchUserConfig = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = ref(db, `configUser/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const selected = languages.find((lang) => {
          return lang.code === data.lang;
        });
        setSelected(selected ?? languages[0]);
      }
    };

    fetchUserConfig();
  }, []);

  if (loading) return <p className="p-4">Carregando...</p>;

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!user || input === "") return;

    const targetLang = "ko"; // ou dinâmico via config do usuário
    const sourceLang = "auto";

    const res = await axios.post("/api/translate", {
      text: input,
      target: targetLang,
      source: sourceLang,
    });

    const translated = res.data.traduction.translatedText;
    const lang = res.data.traduction.detectedSourceLanguage;

    console.log(res.data);

    console.log({
      text: input,
      lang: lang,
      traductions: {
        ko: lang === "ko" ? input : translated,
        "pt-BR": lang !== "ko" ? input : translated,
      },
      user: {
        uid: user.uid,
        email: user.email,
      },
      createdAt: Date.now(),
    });

    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      text: input,
      lang: lang,
      traductions: {
        ko: lang === "ko" ? input : translated,
        "pt-BR": lang !== "ko" ? input : translated,
      },
      user: {
        uid: user.uid,
        email: user.email,
      },
      createdAt: Date.now(),
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

                    <hr />

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
