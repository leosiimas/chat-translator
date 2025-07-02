"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

import * as S from "./styled";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/chat"); // ou /chat
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>LOGIN</S.Title>
        <S.TextField
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.TextField
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <S.Button onClick={login}>Entrar</S.Button>

        <Link href={"/register"}>Registrar</Link>
      </S.Container>
    </S.Wrapper>
  );
}
