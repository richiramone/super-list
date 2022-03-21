import EditItem from "../EditItem/EditItem";
import DeleteItemButton from "../DeleteItemButton";
import ConfirmItemButton from "../ConfirmItemButton";
import styled from "styled-components";
import { IItem } from "../../config/interfaces";
import { ItemContext } from "../../contexts/ItemContext";
import { useContext } from "react";

type ItemProps = {
  id: string;
  item: IItem;
};

const Item = ({ item, id }: ItemProps) => {
  const Item = styled.li`
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
    transition: background 0.2s ease-in-out;

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
      background: #ff4700;
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
      // todo
      overflow: hidden;
      background: #f55;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.edited {
      // todo
      background: #00f;
    }

    @media only screen and (min-width: 768px) {
      .item__value,
      input {
        // todo
        width: 220%;
      }
    }
  `;

  const { isEditing, enableEditingMode, disableEditingMode } =
    useContext(ItemContext);

  const itemClassName = [
    isEditing ? "is-editing" : "",
    item.hasQuestionMark ? "has-question-mark" : "",
  ].join(" ");

  const confirmItemButton = item.hasQuestionMark ? (
    <ConfirmItemButton id={id} />
  ) : null;

  return (
    <Item
      className={itemClassName}
      onClick={enableEditingMode}
      onBlur={disableEditingMode}
    >
      <EditItem id={id} value={item.value} />
      <span className="item__value">{item.value}</span>
      {confirmItemButton}
      <DeleteItemButton id={id} />
    </Item>
  );
};

export default Item;
