import styled from 'styled-components';
import { useContext, memo } from 'react';
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
`;

const DeleteItemButton: React.FC<{
  id: string;
}> = ({ id }: DeleteItemButtonProps) => {
  const { enableDeletedMode } = useContext(ItemContext);
  const deleteItem = useStore(state => state.deleteItem);

  const _deleteItem = async () => {
    enableDeletedMode();
    await deleteItem(id);
  };

  return (
    <DeleteItemButtonStyles onClick={_deleteItem}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </DeleteItemButtonStyles>
  );
};

export default memo(DeleteItemButton);
