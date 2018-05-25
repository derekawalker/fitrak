import { css } from "emotion";
import { Dimensions } from "../../common/styles/variables";

const Styles = {
  wrapper: css`
    text-align: center;
  `,

  container: css`
    max-width: 1440px;
    margin: 0 auto;

    @media (min-width: ${Dimensions.tab}) {
      display: flex;
      flex-flow: row no-wrap;
    }

    @media (min-width: ${Dimensions.wide}) {
      align-items: flex-start;
    }
  `,

  body: css`
    text-align: left;
    padding: calc(3% + 48px) 4%;
    position: relative;
    z-index: 5;

    @media (min-width: ${Dimensions.tab}) {
      width: calc(100% - 240px);
      padding: calc(2% + 48px) 3% 2%;
    }
  `
};

export default Styles;
