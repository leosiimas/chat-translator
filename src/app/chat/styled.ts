import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightPrimary};
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-rows: 10rem 1fr 1fr;
    height: 100vh;

    background-color: ${theme.colors.white};

    margin-left: 15%;
    margin-right: 15%;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacings.small};
    border-bottom: 1px solid ${theme.colors.gray};
    align-items: center;
  `}
`;

export const User = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacings.small};
  `}
`;

export const Main = styled.div`
  ${({ theme }) => css`
    border-radius: ${theme.spacings.xxsmall};

    padding: ${theme.spacings.small};
    overflow-y: scroll;
  `}

  border-radius: 0.5rem;
`;

type MessageProps = {
  $isOwner?: boolean;
};

export const MessageContainer = styled.div<MessageProps>`
  ${({ $isOwner }) => css`
    display: flex;

    justify-content: ${$isOwner ? "flex-end" : "flex-start"};
  `}
`;

export const Message = styled.div<MessageProps>`
  ${({ theme, $isOwner }) => css`
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    color: ${theme.colors.white};
    background-color: ${$isOwner
      ? theme.colors.lightPrimary
      : theme.colors.gray};
    margin: ${theme.spacings.xxsmall};
    width: fit-content;
    border-radius: ${theme.border.radius};
  `}
`;

export const Chat = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacings.xxsmall};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.small};
    border: 1px solid ${theme.colors.gray};
    border-radius: ${theme.border.radius};
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      color: ${theme.colors.lightGray};
      cursor: pointer;

      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

type SendProps = {
  $active: boolean;
};

export const Send = styled.div<SendProps>`
  ${({ theme, $active }) => css`
    svg {
      color: ${$active ? theme.colors.primary : theme.colors.lightGray};
      cursor: pointer;

      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const TextField = styled.textarea`
  ${({ theme }) => css`
    all: unset;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    font-size: ${theme.font.sizes.large};
    margin: 0 ${theme.spacings.small};
    width: 90%;
  `}
`;

export const MessageOwner = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.medium};

    margin-bottom: ${theme.spacings.xxsmall};
  `}
`;

export const MessageText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
  `}
`;

export const Name = styled.div``;

export const Language = styled.select``;

export const Label = styled.label``;

export const Exit = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.lightGray};
    cursor: pointer;

    &:hover {
      color: ${theme.colors.primary};
    }
  `}
`;
