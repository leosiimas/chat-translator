"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { ref, push, onValue, get } from "firebase/database";
import { AddReaction, Send, Logout } from "@styled-icons/material";

import LanguageSelector from "@/components/LaguageSelect";

import * as S from "./styled";

type UserProps = {
  user: User | null;
  userName?: string;
  userLang?: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  // Busca as Mensagens
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

  // Busca Autenticação do usuário
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUser({ ...currentUser, user: user });
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  // Busca Informações do Usuario
  useEffect(() => {
    const fetchUserConfig = async () => {
      const user = currentUser?.user;
      if (!user) return;

      const userRef = ref(db, `configUser/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setCurrentUser({
          ...currentUser,
          userLang: data.lang,
          userName: data.name,
        });
      }
    };

    fetchUserConfig();
  });

  if (loading) return <p>Carregando...</p>;

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!user || input === "") return;

    const targetLang = currentUser?.userLang === "ko" ? "pt-BR" : "ko";
    const sourceLang = currentUser?.userLang ?? "auto";

    console.log({
      text: input,
      target: targetLang,
      source: sourceLang,
    });

    const res = await axios.post("/api/translate", {
      text: input,
      target: targetLang,
      source: sourceLang,
    });

    const translated = res.data.traduction.translatedText;
    const lang =
      currentUser?.userLang ?? res.data.traduction.detectedSourceLanguage;

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
          <LanguageSelector lang={currentUser?.userLang} />
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
                  $isOwner={msg.user && msg.user.uid === currentUser?.user?.uid}
                >
                  <S.Message
                    $isOwner={
                      msg.user && msg.user.uid === currentUser?.user?.uid
                    }
                  >
                    <S.MessageOwner>
                      <strong>{msg.user?.email || "Anônimo"}:</strong>
                    </S.MessageOwner>
                    <S.MessageText>{msg.text}</S.MessageText>

                    {msg.lang && msg.lang !== currentUser?.userLang && (
                      <>
                        <hr />
                        <S.MessageText>{msg.traductions.ko}</S.MessageText>
                      </>
                    )}
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
            placeholder="Digite uma mensagem"
          />
          <S.Send $active={input !== ""}>
            <Send size={30} onClick={sendMessage} />
          </S.Send>
        </S.Chat>
      </S.Container>
    </S.Wrapper>
  );
}
