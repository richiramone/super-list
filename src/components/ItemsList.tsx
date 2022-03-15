import Item from "./Item";
import styled from "styled-components";

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

  return (
    <ItemsList>
      <Item />
      <Item />
      <Item />
      <Item />
    </ItemsList>
  );
}

export default ItemsList;
