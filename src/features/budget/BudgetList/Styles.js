import { css } from "emotion";
import { Dimensions } from "../../../app/common/styles/variables";

const Styles = {
  heading: css`
    display: flex;
    justify-content: space-between;
  `,

  rightCell: css`
    @media (min-width: ${Dimensions.tab}) {
      text-align: right !important;
    }
  `,
  icon: css`
    cursor: pointer;
  `
};

export default Styles;
