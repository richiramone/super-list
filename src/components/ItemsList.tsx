import Item from "./Item";
import styled from "styled-components";
import { ListContext } from "../contexts/ListContext";
import { useContext } from "react";

function ItemsList() {
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
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} />
        </li>
      ))}
    </ItemsList>
  );
}

export default ItemsList;
