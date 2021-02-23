import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
        --black: black;
        --primary: #003E6B;
        --primaryContrast: #DCEEFB;
        --gray: #9FB3C8;
        --grey: var(--gray);
        --lightGray: #F0F4F8;
        --lightGrey: var(--lightGray);
        --red: #A61B1B;
        --redContrast: #FFEEEE;
        --maxWidth: 1000px;
        --bs: 0 1px 10px 5px rgba(217, 226, 236, 1);
        box-sizing: border-box;
        font-size: 62.5%;
        --cardBorderRadius: 1.6rem;
        --cardHeight: 178px;
    }

    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    *:focus {
        outline: none;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
    }


    a,
    a:visited {
        text-decoration: none;
        color: var(--black);
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: none;
    }

    input[type="submit"] {
      border: none;
    }

    textarea {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    p {
      font-size: 1.6rem;
      line-height: 1.6;
    }
`;
