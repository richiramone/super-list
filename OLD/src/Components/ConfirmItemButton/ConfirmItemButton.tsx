import styled from 'styled-components';
import { memo, useCallback } from 'react';
import useStore from '../../Store/UseStore';

type ConfirmItemButtonProps = {
  id: string;
};

const ConfirmItemButtonStyles = styled.button`
  display: flex;
  margin-left: 1rem;
  padding: 0;
  width: auto;
  height: auto;

  &:disabled {
    opacity: 0.5;
  }

  svg {
    width: 24px;
    fill: #fff;
  }
`;

const ConfirmItemButton = ({ id }: ConfirmItemButtonProps) => {
  const confirmItem = useStore(useCallback(state => state.confirmItem, []));
  const isOnline = useStore(useCallback(state => state.isOnline, []));

  const _confirmItem = async () => {
    await confirmItem(id);
  };

  return (
    <ConfirmItemButtonStyles onClick={_confirmItem} disabled={!isOnline}>
      <svg viewBox="0 0 24 24">
        <use xlinkHref="#confirm-icon"></use>
      </svg>
    </ConfirmItemButtonStyles>
  );
};

export default memo(ConfirmItemButton);
