import styled from "styled-components";
import { useContext, memo } from "react";
import { ListContext } from "../../contexts/ListContext";

const Preloader = () => {
  const Preloader = styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    &.is-loading {
      display: flex;
    }

    .loading-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 75px;
      height: 75px;
      background: #fff;
      box-shadow: 0 0 5px #333;
      border-radius: 12px;
      text-align: center;

      svg {
        width: 30px;
        animation: rotating 0.8s linear infinite;
        fill: #009dff;
      }
    }

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const { isPreloaderActive } = useContext(ListContext);

  return (
    <Preloader className={isPreloaderActive ? "is-loading" : ""}>
      <div className="loading-wrapper">
        <svg viewBox="0 0 32 32">
          <use xlinkHref="#shape-smiley"></use>
        </svg>
      </div>
    </Preloader>
  );
};

export default memo(Preloader);
