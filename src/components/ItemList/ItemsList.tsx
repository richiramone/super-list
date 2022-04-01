import Item from "../Item/Item";
import styled from "styled-components";
import { ItemContextProvider } from "../../contexts/ItemContext";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Store";
import { refreshList } from "../../actions/ItemsActions";

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

  const itemsState = useSelector((state: RootStore) => state.items);

  return (
    <ItemsList>
      {Object.keys(itemsState.items).map((key: string) => (
        <ItemContextProvider key={key}>
          <Item item={itemsState.items[key]} id={key} />
        </ItemContextProvider>
      ))}
    </ItemsList>
  );
};

export default memo(ItemsList);
