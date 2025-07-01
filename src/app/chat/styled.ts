import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightPrimary};
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-rows: 1fr 10rem;
    height: 100vh;

    background-color: ${theme.colors.white};

    margin-left: 15%;
    margin-right: 15%;
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
  $isOwner?: Boolean;
};

export const MessageContainer = styled.div<MessageProps>`
  ${({ theme, $isOwner }) => css`
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

export const TextField = styled.input`
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
