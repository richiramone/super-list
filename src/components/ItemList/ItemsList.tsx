import Item from "../Item/Item";
import styled from "styled-components";
import { ListContext } from "../../contexts/ListContext";
import { useContext } from "react";

const ItemsList = () => {
  const ItemsList = styled.div`
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      margin: 1rem 0 2rem;
      padding: 0;
      list-style: none;
    }
  `;

  const { items } = useContext(ListContext);

  return (
    <ItemsList>
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </ItemsList>
  );
};

export default ItemsList;
