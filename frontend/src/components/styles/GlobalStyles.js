import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
      ${"" /* Colors */}
        --black: black;
        --white: white;
        --primary: #003E6B;
        --primaryContrast: #DCEEFB;
        --gray: #9FB3C8;
        --darkGray: #486581;
        --darkGrey: var(--darkGray);
        --grey: var(--gray);
        --lightGray: #F0F4F8;
        --lightGrey: var(--lightGray);
        --red: #A61B1B;
        --redContrast: #FFEEEE;
        ${"" /* TextSizing */}
        font-size: 62.5%;
        --xs: 1.2rem;
        --sm: 1.4rem;
        --normal: 1.6rem;
        --bitMore: 1.8rem;
        --medium: 2rem;
        --mediumBig: 2.4rem;
        --big: 3rem;
        --large: 3.6rem;
        --larger: 4.8rem;
        --huge: 6rem;
        --superHuge: 7.2rem;
        ${"" /* Box Shadows */}
        --bs: 0 1px 10px 5px rgba(217, 226, 236, 1);
        ${"" /* Radius */}
        --cardBorderRadius: 1.6rem;
        ${"" /* Spacing */}
        --smallLineSpacing: 1;
        --normalLineSpacing: 1.5;
        --extraLineSpacing: 2;
        --xsSpacing: 0.8rem;
        --smSpacing: 1.2rem;
        --medSpacing: 1.6rem;
        --lgSpacing: 2rem;
        --xlSpacing: 2.4rem;
        --xxlSpacing: 3rem;
        --smBtnSpacing: 1.2rem 2rem;
        --lgBtnSpacing: 1.6rem 3rem;

        --cardHeight: 178px;
        --maxWidth: 1000px;
        box-sizing: border-box;
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
        margin: left-auto;
        margin-right: auto;
        font-size: var(--normal);
    }

    a,
    a:visited,
    a:focus,
    a:hover {
        text-decoration: none;
        color: inherit;
    }

    button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: none;
    }

    input {
        border:none;
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        -webkit-appearance: none;
        box-shadow: none;
    }

    textarea {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    p {
      font-size: var(--normal);
      line-height: var(--normalLineSpacing);
    }
`;
