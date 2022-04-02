/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Item from "../Item/Item";
import styled from "styled-components";
import { ItemContextProvider } from "../../contexts/ItemContext";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { RootStore } from "../../state/store";
import { itemsActions } from "../../state";
import { ITEMS_REQUESTED } from "../../interfaces";

const ItemsListStyles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0 2rem;
  padding: 0;
  list-style: none;
`;

const ItemsList: React.FC = () => {
  const { items } = useSelector((state: RootStore) => state.app);
  const dispatch = useDispatch();
  const { refreshList } = bindActionCreators(itemsActions, dispatch);

  const loadItems = async () => {
    dispatch({
      type: ITEMS_REQUESTED,
    });

    dispatch(await refreshList());
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <ItemsListStyles>
      {Object.keys(items!).map((key: string) => (
        <ItemContextProvider key={key}>
          <Item item={items![key]} id={key} />
        </ItemContextProvider>
      ))}
    </ItemsListStyles>
  );
};

export default memo(ItemsList);
