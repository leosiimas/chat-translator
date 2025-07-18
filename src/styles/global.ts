"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 15px;
  }

  html, border-style, #__next {
    height: 100%;
  }

  html,
  body,
  #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    margin: 0px;
  }
`;

export default GlobalStyles;
