"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { ref, onValue, get, update } from "firebase/database";

import { Paper, CircularProgress, Box } from "@mui/material";

import Chat from "@/components/Chat";
import Conversation from "@/components/Conversation";
import { MessageProps } from "@/components/Message";
import Header from "@/components/Header";

import { useUser } from "@/app/providers/user-provider";

export type UserProps = {
  user: User | null;
  userName?: string;
  userLang?: "pt" | "ko";
};

type FirebaseMessage = {
  uid?: string;
  text?: string;
  createdAt?: string;
  lang?: string;
  traductions?: {
    ko: string;
    pt: string;
  };
  user: {
    uid: string;
    email?: string;
  };
};

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useUser();

  const translateMessage = useCallback(
    async (message: MessageProps) => {
      if (!message) return true;

      const targetLang = user?.userLang ?? "pt";
      const sourceLang = message.sourceLang;

      if (targetLang === sourceLang) return true;

      try {
        const res = await axios.post("/api/translate", {
          text: message.message,
          target: targetLang,
          source: sourceLang,
        });

        const translatedText = res.data.traduction.translatedText;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.uid === message.uid
              ? { ...msg, messageTranslated: translatedText }
              : msg,
          ),
        );

        const msgRef = ref(db, `messages/${message.uid}`);
        const snapshot = await get(msgRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          await update(msgRef, {
            ...data,
            traductions: {
              ...data.traductions,
              [targetLang]: translatedText,
            },
          });
        }

        return true;
      } catch (err) {
        console.error("Erro ao traduzir:", err);
      }

      return true;
    },
    [user],
  );

  // Autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const userRef = ref(db, `configUser/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setUser({
            userLang: data.lang,
            userName: data.name,
            user,
          });
        }
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router, setUser]);

  // Carregamento das mensagens
  useEffect(() => {
    if (!user) return;

    const messagesRef = ref(db, "messages");

    const unsubscribe = onValue(messagesRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageEntries = Object.entries(data);

        const msgs = await Promise.all(
          messageEntries.map(async ([uid, rawMsg]) => {
            const msg = rawMsg as FirebaseMessage;
            const userUid = msg.user?.uid;

            let userData = { name: "Usuário", avatar: "" };

            if (userUid) {
              const userRef = ref(db, `configUser/${userUid}`);
              const userSnap = await get(userRef);
              const result = userSnap.val();

              if (result) {
                userData = {
                  name: result.name ?? "Usuário",
                  avatar: result.avatar ?? "",
                };
              }
            }

            let messageTranslated = "";

            if (user.userLang && msg.lang !== user.userLang) {
              messageTranslated = msg.traductions
                ? msg.traductions[user.userLang]
                : "";
            }

            const messageTemp: MessageProps = {
              uid: uid ?? "",
              message: msg.text ?? "",
              messageTranslated,
              name: userData.name,
              avatar: userData.avatar,
              date: msg.createdAt ?? "",
              isOwner: userUid === user?.user?.uid,
              sourceLang: msg.lang ?? "pt",
            };

            return {
              ...messageTemp,
              translateMessage: () => translateMessage(messageTemp),
            };
          }),
        );

        setMessages(msgs);
      }
    });

    return () => unsubscribe();
  }, [user, translateMessage]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!user) return <p>Error...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "grid",
          gridTemplateRows: "80px 1fr 80px",
          height: "100%",
          maxWidth: 1200,
          width: "100%",
        }}
      >
        <Header />
        <Conversation messages={messages} />
        <Chat />
      </Paper>
    </Box>
  );
}
