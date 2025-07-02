import styled, { css } from "styled-components";
import { lighten } from "polished";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightPrimary};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.small};
    color: ${theme.colors.primary};
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.large} ${theme.spacings.small};
    border-radius: ${theme.border.radius};
  `}
`;

export const TextField = styled.input`
  ${({ theme }) => css`
    all: unset;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    font-size: ${theme.font.sizes.xxlarge};
    padding: 0 ${theme.spacings.small};
    border: 1px solid ${theme.colors.primary};
    border-radius: 0.5rem;

    margin-bottom: ${theme.spacings.small};
    color: ${theme.colors.primary};
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    all: unset;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    font-size: ${theme.font.sizes.xxlarge};
    padding: 0 ${theme.spacings.small};
    border: 1px solid ${theme.colors.primary};
    border-radius: 0.5rem;

    margin-bottom: ${theme.spacings.small};
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
    text-align: center;

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => lighten(0.1, theme.colors.primary)};
    }
  `}
`;
