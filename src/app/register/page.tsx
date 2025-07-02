"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

import * as S from "./styled";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      router.push("/chat");
    } catch (err) {
      alert("Erro ao registrar");
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>CRIAR CONTA</S.Title>
        <S.TextField
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.TextField
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <S.Button onClick={register}>Registrar</S.Button>
        <Link href={"/login"}>Login</Link>
      </S.Container>
    </S.Wrapper>
  );
}
