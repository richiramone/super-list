import EditItem from '../EditItem';
import DeleteItemButton from '../DeleteItemButton';
import ConfirmItemButton from '../ConfirmItemButton';
import styled from 'styled-components';
import { IItem } from '../../Interfaces/AppInterfaces';
import { ItemContext } from '../../Contexts/ItemContext';
import { useContext, memo } from 'react';

type ItemProps = {
  id: string;
  item: IItem;
};

const ItemStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: #09f;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  .item__value,
  input {
    margin: 0;
    width: auto;
    background: none;
    color: #fff;
    letter-spacing: 0.02em;
  }

  input {
    display: none;
    margin: 0;
    outline: none;
    border: 0;
    font-weight: normal;
  }

  &.is-duplicated {
    background: #223889 !important;
  }

  &.has-question-mark {
    background: #ff6a00;
  }

  &.not-lucas {
    background: #ff0099;
  }

  &.is-editing {
    input {
      display: block;
      width: 100%;
    }

    .item__value {
      display: none;
    }
  }

  &.deleted {
    background-color: #f55 !important;
  }
`;

const Item: React.FC<{ id: string; item: IItem }> = ({ item, id }: ItemProps) => {
  const { isBeingEdited, isBeingDeleted, enableEditingMode, disableEditingMode } =
    useContext(ItemContext);

  const itemClassName = [
    isBeingEdited ? 'is-editing' : '',
    isBeingDeleted ? 'deleted' : '',
    item.isDuplicated ? 'is-duplicated' : '',
    item.hasQuestionMark ? 'has-question-mark' : '',
    item.author !== 'ramoslucasd@gmail.com' ? 'not-lucas' : '',
  ].join(' ');

  const confirmItemButton = item.hasQuestionMark ? <ConfirmItemButton id={id} /> : null;

  const _disableEditingMode = () => {
    setTimeout(disableEditingMode, 100);
  };

  return (
    <ItemStyles className={itemClassName} onBlur={_disableEditingMode}>
      {isBeingEdited && <EditItem id={id} value={item.value} />}
      {!isBeingEdited && (
        <span onClick={enableEditingMode} className="item__value">
          {item.value}
        </span>
      )}
      {confirmItemButton}
      <DeleteItemButton id={id} />
    </ItemStyles>
  );
};

export default memo(Item);
