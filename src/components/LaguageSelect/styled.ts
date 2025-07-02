import styled, { css } from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  position: relative;
  width: 200px;
`;

export const Selector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: white;
  cursor: pointer;
`;

export const Flag = styled.img`
  width: 20px;
  height: 14px;
  margin-right: 0.5rem;
`;

export const Options = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  z-index: 100;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;
