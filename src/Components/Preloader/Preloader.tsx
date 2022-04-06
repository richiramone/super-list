import styled from 'styled-components';
import { memo, useCallback } from 'react';
import useStore from '../../Store/UseStore';

const PreloaderStyles = styled.div`
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

const Preloader: React.FC = () => {
  // const isFetching: boolean = useStore(state => state.isFetching);
  const isFetching: boolean = useStore(useCallback(state => state.isFetching, [false]));

  return (
    <PreloaderStyles className={isFetching ? 'is-loading' : ''}>
      <div className="loading-wrapper">
        <svg viewBox="0 0 32 32">
          <use xlinkHref="#shape-smiley"></use>
        </svg>
      </div>
    </PreloaderStyles>
  );
};

export default memo(Preloader);
