import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
        --black: black;
        --primary: #003E6B;
        --primaryContrast: #DCEEFB;
        --gray: #9FB3C8;
        --grey: var(--gray);
        --lightGray: #e1e1e1;
        --lightGrey: var(--lightGray);
        --maxWidth: 1000px;
        --bs: 0 1px 10px 5px rgba(217, 226, 236, 1);
        box-sizing: border-box;
        font-size: 62.5%;
        --cardBorderRadius: 1.6rem;
        --cardHeight: 178px;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    body {
        font-family: '---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif';
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        font-family: '---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif';
        border: none;
    }

    input[type="submit"] {
      border: none;
    }

    p {
      font-size: 1.6rem;
    }
`;
