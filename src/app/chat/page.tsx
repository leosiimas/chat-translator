"use client";

import { AddReaction, Send } from "@styled-icons/material";

import * as S from "./styled";

export default function ChatPage() {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Main>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer $isOwner>
            <S.Message $isOwner>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
          <S.MessageContainer>
            <S.Message>Olá Tudo bem? </S.Message>
          </S.MessageContainer>
        </S.Main>
        <S.Chat>
          <AddReaction size={30} />
          <S.TextField type="text" placeholder="Digite uma mensagem" />
          <Send size={30} />
        </S.Chat>
      </S.Container>
    </S.Wrapper>
  );
}
