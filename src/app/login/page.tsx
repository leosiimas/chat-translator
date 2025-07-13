"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Lock, Mail, Chat } from "@mui/icons-material";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

import LaguageSelect from "@/components/LaguageSelect";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const t = useTranslations();

  const login = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, senha);
    router.push("/");
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={login}
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
            <Link href="/register">{t("register")}</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
