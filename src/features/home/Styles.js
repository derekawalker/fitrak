import { css } from "emotion";
import { Dimensions } from "../../app/common/styles/variables";

const Styles = {
  masthead: css`
    padding: 15%;
    text-align: center;
    background: linear-gradient(to top, #0073bc, #7fc5e7);
    color: #fff;
    margin: 0 -4%;
    font-size: 1.125rem;

    p {
      font-size: 1em;
    }

    @media (min-width: ${Dimensions.phab}) {
      font-size: 1.25rem;
    }

    @media (min-width: ${Dimensions.tab}) {
      font-size: 2rem;
    }

    @media (min-width: ${Dimensions.desk}) {
      font-size: 2.5rem;
    }

    @media (min-width: ${Dimensions.wide}) {
      font-size: 3rem;
    }
  `,

  intro: css`
    padding: 4% 0;

    .grid {
      &.reversed {
        flex-direction: column-reversed;
      }
    }

    .column {
      padding: 3%;
      font-size: 1rem;

      @media (min-width: ${Dimensions.phab}) {
        font-size: 1.125rem;
      }

      @media (min-width: ${Dimensions.tab}) {
        font-size: 1.5rem;
      }

      @media (min-width: ${Dimensions.desk}) {
        font-size: 2rem;
      }

      @media (min-width: ${Dimensions.wide}) {
        font-size: 2.5rem;
      }
    }

    p {
      font-size: 1em;
    }

    .segment:nth-child(odd) {
      .grid {
        .row {
          @media (min-width: ${Dimensions.tab}) {
            flex-direction: row-reverse;
          }
        }
      }
    }
  `,

  icons: css`
    width: 100%;
    display: block;
    margin: 0 auto;
  `
};

export default Styles;
