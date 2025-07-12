import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { onValue, ref, get } from "firebase/database";
import { db, auth } from "@/lib/firebase";

import { Box } from "@mui/material";

import Message, { MessageProps } from "../Message";

type UserProps = {
  user: User | null;
  userName?: string;
  userLang?: string;
};

export default function Conversation() {

  const router = useRouter();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const msgs = Object.values(data).map((msg: any) => {
          console.log(msg)
          return {
            message: msg.text ?? "",
            name: msg.user?.name ?? "",
            avatar: msg.user?.avatar ?? "",
            date: msg.createdAt ?? "",
            isOwner: true
          }
        });

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
        setCurrentUser({ ...currentUser, user: user });
        setLoading(false);
      }
    });
  
    return () => unsub();
  }, [router]);

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

  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        p: 2,   
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        overflowY:'scroll'
      }}
    >
      {
        messages.map((msg, i) => (
          <Message 
            key={i}
            {...msg}
          />
        ))
      }
    </Box>
  )
}