import EditItem from '../EditItem';
import DeleteItemButton from '../DeleteItemButton';
import ConfirmItemButton from '../ConfirmItemButton';
import styled from 'styled-components';
import { IItem } from '../../Interfaces/AppInterfaces';
import { ItemContext } from '../../Contexts/ItemContext';
import { useContext, memo } from 'react';
import { TransitionGroup } from 'react-transition-group';

type ItemProps = {
  id: string;
  item: IItem;
};

const ItemStyles = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 0.5rem 0.5rem;
  padding: 4px 8px;
  max-width: 390px;
  width: auto;
  height: auto;
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

  &.has-question-mark {
    background: #ff6a00;
  }

  &.not-lucas {
    background: #ff0099 !important;
  }

  &.is-editing {
    width: 100%;

    input {
      display: block;
      width: 100%;
    }

    .item__value {
      display: none;
    }
  }

  &.deleted {
    overflow: hidden;
    background-color: #f55;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Item: React.FC<{
  id: string;
  item: IItem;
}> = ({ item, id }: ItemProps) => {
  const { isBeingEdited, isBeingDeleted, enableEditingMode, disableEditingMode } =
    useContext(ItemContext);

  const itemClassName = [
    isBeingEdited ? 'is-editing' : '',
    isBeingDeleted ? 'deleted' : '',
    item.hasQuestionMark ? 'has-question-mark' : '',
    item.author !== 'lucas' ? 'not-lucas' : '',
  ].join(' ');

  const confirmItemButton = item.hasQuestionMark ? <ConfirmItemButton id={id} /> : null;

  return (
    <TransitionGroup
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <ItemStyles className={itemClassName} onBlur={disableEditingMode}>
        <EditItem id={id} value={item.value} />
        <span onClick={enableEditingMode} className="item__value">
          {item.value}
        </span>
        {confirmItemButton}
        <DeleteItemButton id={id} />
      </ItemStyles>
    </TransitionGroup>
  );
};

export default memo(Item);
