/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Item from '../Item';
import styled from 'styled-components';
import { ItemContextProvider } from '../../Contexts/ItemContext';
import { memo, useEffect } from 'react';
import { IItems } from '../../Interfaces/AppInterfaces';
import useStore from '../../Store/UseStore';

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
  const items: IItems = useStore(state => state.items);
  const refreshItems = useStore(state => state.refreshItems);
  const loadItems = async () => {
    await refreshItems();
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
