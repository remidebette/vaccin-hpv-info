import {css} from "emotion";

export const noBoxShadow = css`
box-shadow: none !important;
border: none !important;
margin-bottom: 0em !important;
`;

export const layoutStyle = css`
padding-top: 2em;
padding-bottom: 5em;

`;


export const buttonOverride = (width) => css`
width: ${width ? width : "9em"};
text-align: right !important;
`


export const index_style = css`
        /* max-width: 700px; */
        /* margin: 0 auto; */
        font-family: bebas-neue, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        text-align: center;
        color: #2d2d2d;
        line-height: 1.15;
        letter-spacing: 0.46px;
        `