import { css } from "emotion";

const Styles = {
  container: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    padding: 0 1em;

    a {
      display: flex;
      align-items: center;
      padding: 0 1em;
      color: #ccc;

      &:hover,
      &:focus,
      &:active {
        color: #fff;
      }

      &.active {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  `,

  spacer: css`
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0 0.5em;
    width: 0;
    display: inline-block;
  `,

  button: css`
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.5em;
    margin: 0.75em 0 0.75em 1em;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `
};

export default Styles;
