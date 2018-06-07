import { css } from "emotion";

const Styles = {
  wrapper: css`
    text-align: center;
    background: #333;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  `,

  container: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
  `,

  identity: css`
    display: flex;
    flex-flow: row nowrap;
    padding: 1em;
  `,

  logo: css`
    height: 20px;
    display: inline-block;
    padding-right: 0.5em;
  `,

  name: css`
    font-weight: 700;
    font-style: italic;
    font-size: 1.5rem;
    line-height: 20px;
    display: inline-block;
  `
};

export default Styles;
