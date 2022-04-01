import Item from "../Item/Item";
import styled from "styled-components";
import { ItemContextProvider } from "../../contexts/ItemContext";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { RootStore } from "../../state/store";
import { itemsActions } from "../../state";

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
  const state = useSelector((state: RootStore) => state.items);
  const dispatch = useDispatch();
  const { refreshList } = bindActionCreators(itemsActions, dispatch);

  useEffect(() => {
    //dispatch(refreshList(true));
  }, []);

  return (
    <ItemsListStyles>
      {Object.keys(state.items!).map((key: string) => (
        <ItemContextProvider key={key}>
          <Item item={state.items![key]} id={key} />
        </ItemContextProvider>
      ))}
    </ItemsListStyles>
  );
};

export default memo(ItemsList);
