import EditItem from "./EditItem";
import DeleteItemButton from "./DeleteItemButton";
import styled from "styled-components";
import { IItem } from "../config/interfaces";

type ItemProps = {
  item: IItem;
};

function Item({ item }: ItemProps) {
  const Item = styled.span`
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

    span,
    input {
      margin: 0;
      width: auto;
      background: none;
      color: #fff;
      letter-spacing: 0.02em;
      font-size: 18px;
      line-height: 1.2;
    }

    input {
      display: none;
      margin: 0;
      outline: none;
      border: 0;
      font-weight: normal;
    }

    &.editing {
      // todo
      width: 100%;

      input {
        display: block;
        width: 100%;
      }

      span {
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
      span,
      input {
        // todo
        width: 220%;
      }
    }
  `;

  return (
    <Item>
      <EditItem />
      {item.value}
      <DeleteItemButton id={item.id} />
    </Item>
  );
}

export default Item;
