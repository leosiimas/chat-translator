"use client";
import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";

import { auth, db } from "@/lib/firebase";
import { Chat, Mail, Lock, Person } from "@mui/icons-material";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

import LaguageSelect from "@/components/LaguageSelect";
import { useLanguage } from "../providers/i18n-provider";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar] = useState("");

  const { locale } = useLanguage();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const t = useTranslations();

  const register = async () => {
    setLoading(true);

    if (confirmPassword !== password) {
      alert("Senhas diferentes");
      setLoading(false);
      return;
    }

    try {
      const userCredencial = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const userRef = ref(db, `configUser/${userCredencial.user.uid}`);
      await update(userRef, {
        lang: locale,
        name,
        email,
        avatar,
      });
      router.push("/");
    } catch (err) {
      alert("Erro ao registrar" + err);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" align="center" gutterBottom>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              mb: 2,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mb: 3,
              }}
            >
              <Chat sx={{ fontSize: 50 }} />
              <LaguageSelect />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                mb: 3,
              }}
            >
              {t("welcome")}
            </Box>
          </Box>
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ mr: 1, fontSize: 20 }} />
            <TextField
              fullWidth
              label={t("name")}
              type="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Mail sx={{ mr: 1, fontSize: 20 }} />
            <TextField
              fullWidth
              label={t("email")}
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Lock sx={{ mr: 1, fontSize: 20 }} />
            <TextField
              fullWidth
              label={t("password")}
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Lock sx={{ mr: 1, fontSize: 20 }} />
            <TextField
              fullWidth
              label={t("confirmPassword")}
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  register();
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={register}
            loading={loading}
          >
            {t("enter")}
          </Button>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Link href="/login">{t("login")}</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
