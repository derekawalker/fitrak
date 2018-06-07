import { css } from "emotion";

const Styles = {
  default: css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .ui.header {
      font-family: "Montserrat", "Lato", Arial, sans-serif;
      font-weight: 900;
    }

    h1,
    h2 {
      text-transform: uppercase;
      letter-spacing: 0.025em;

      &.ui.header {
        text-transform: uppercase;
        letter-spacing: 0.025em;
      }
    }

    h3,
    h4,
    h5,
    h6,
    .ui.header {
      font-weight: 700;
    }
  `
};

export default Styles;
