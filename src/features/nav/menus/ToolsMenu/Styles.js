import { css } from "emotion";
import { Dimensions } from "../../../../app/common/styles/variables";

const Styles = {
  container: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0;
    position: fixed;
    bottom: 0;
    height: 40px;
    background: #222;
    width: 100%;
    z-index: 10;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.25);

    a {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      color: #ccc;

      &:hover,
      &:focus,
      &:active {
        color: #fff;
      }

      &.active {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }

      i {
        display: block;
        margin: 0;
        text-align: center;
        width: 100%;
        font-size: 1.25em;
      }

      span {
        display: none;
      }
    }

    @media (min-width: ${Dimensions.phab}) {
      a {
        i {
          width: auto;
          margin-right: 0.5em;
        }

        span {
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.75em;
        }
      }
    }

    @media (min-width: ${Dimensions.tab}) {
      position: static;
      display: block;
      width: 240px;
      text-align: left;
      height: auto;
      padding: 48px 0 0;
      box-shadow: none;
      background: #222;

      a {
        display: block;
        align-items: left;
        text-align: left;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        padding: 0.75em 1em;

        i {
          display: inline-block;
          width: 20px;
          font-size: 1em;
        }

        span {
          font-size: 1em;
          letter-spacing: 0.1em;
        }
      }
    }

    @media (min-width: ${Dimensions.wide}) {
      margin: calc(48px + 2%) 0 2% 1em;
      padding: 0;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      a {
        display: block;
        align-items: left;
        text-align: left;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        padding: 0.75em 1em;
        color: #333;

        &:hover,
        &:focus,
        &:active {
          color: #000;
        }

        &.active {
          background: rgba(0, 0, 0, 0.05);
          color: #000;
        }

        &:last-child {
          border-bottom: 0;
        }

        i {
          display: inline-block;
          width: 20px;
          font-size: 1em;
        }

        span {
          font-size: 1em;
          letter-spacing: 0.1em;
        }
      }
    }
  `
};

export default Styles;
