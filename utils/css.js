import {css, cx} from "emotion";

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
