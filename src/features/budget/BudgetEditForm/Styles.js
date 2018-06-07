import { css } from "emotion";

const Styles = {
  buttons: css`
    display: flex;

    > button {
      &:first-child {
        order: 2;
      }

      &:last-child {
        order: 1;
      }
    }
  `
};

export default Styles;
