import Item from "../Item/Item";
import styled from "styled-components";
import { ListContext } from "../../contexts/ListContext";
import { ItemContextProvider } from "../../contexts/ItemContext";
import { useContext } from "react";

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

  const { items } = useContext(ListContext);

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

export default ItemsList;
