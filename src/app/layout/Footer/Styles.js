import { css } from "emotion";
import { Dimensions } from "../../common/styles/variables";

const Styles = {
  wrapper: css`
    text-align: center;
    width: 100%;
    z-index: 100;
    padding-bottom: 40px;
    border-top: 1px solid #ccc;

    @media (min-width: ${Dimensions.tab}) {
      padding-bottom: 0;
    }
  `,

  container: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
    padding: 1em;
    text-align: center;
  `
};

export default Styles;
