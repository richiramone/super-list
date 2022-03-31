import Item from "../Item/Item";
import styled from "styled-components";
import { ItemContextProvider } from "../../contexts/ItemContext";
import { memo } from "react";
import { IItems } from "../../config/interfaces";

const ItemsList = () => {
  const ItemsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0 2rem;
    padding: 0;
    list-style: none;
  `;

  const items: IItems = {};

  return (
    <ItemsList>
      {Object.keys(items).map((key: string) => (
        <ItemContextProvider key={key}>
          <Item item={items[key]} id={key} />
        </ItemContextProvider>
      ))}
    </ItemsList>
  );
};

export default memo(ItemsList);
