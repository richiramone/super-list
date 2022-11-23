import styled from 'styled-components';
import { useContext, memo, useCallback } from 'react';
import { ItemContext } from '../../Contexts/ItemContext';
import useStore from '../../Store/UseStore';

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButtonStyles = styled.button`
  margin-left: 1rem;
  padding: 0;
  width: auto;
  height: auto;

  svg {
    width: 20px;
    fill: #fff;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const DeleteItemButton: React.FC<{
  id: string;
}> = ({ id }: DeleteItemButtonProps) => {
  const { enableDeletedMode } = useContext(ItemContext);
  const deleteItem = useStore(useCallback(state => state.deleteItem, []));
  const isOnline = useStore(useCallback(state => state.isOnline, []));

  const _deleteItem = async () => {
    enableDeletedMode();
    await deleteItem(id);
  };

  return (
    <DeleteItemButtonStyles onClick={_deleteItem} disabled={!isOnline}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </DeleteItemButtonStyles>
  );
};

export default memo(DeleteItemButton);
