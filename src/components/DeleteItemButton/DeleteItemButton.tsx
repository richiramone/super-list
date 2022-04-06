import styled from 'styled-components';
import { useContext, memo } from 'react';
import { ItemContext } from '../../contexts/ItemContext';

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
  // const dispatch = useDispatch();
  // const { deleteItem } = bindActionCreators(itemsActions, dispatch);

  const _deleteItem = async () => {
    enableDeletedMode();
    //dispatch(await deleteItem(id));
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
