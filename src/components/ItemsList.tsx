import Item from "./Item";
import styled from "styled-components";
import { useContext } from "react";
import { App } from "../App";

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

  const items = useContext(ListContext);

  return (
    <App.ListContext.Consumer>
      <ItemsList>
        <Item />
      </ItemsList>
    </App.ListContext.Consumer>
  );
}

export default ItemsList;
