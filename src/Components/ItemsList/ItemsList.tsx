/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Item from '../Item';
import styled from 'styled-components';
import { ItemContextProvider } from '../../Contexts/ItemContext';
import { memo, useEffect } from 'react';
import { IItems } from '../../Interfaces/AppInterfaces';
import useStore from '../../Store/UseStore';
import { AnimatePresence, motion } from 'framer-motion';

const ItemsListStyles = styled.div`
  margin: 1rem 0;
  height: calc(100vh - 12.5rem);
  overflow: scroll;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 0.5rem 0.5rem;
    max-width: 390px;
    width: auto;
    height: auto;
  }
`;

const ItemsList: React.FC = () => {
  const items: IItems = useStore(state => state.items);
  const refreshItems = useStore(state => state.refreshItems);

  const loadItems = async () => {
    await refreshItems(true);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <ItemsListStyles>
      <ul>
        <AnimatePresence>
          {Object.keys(items!).map((key: string) => (
            <ItemContextProvider key={key}>
              <motion.li
                id={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Item item={items![key]} id={key} />
              </motion.li>
            </ItemContextProvider>
          ))}
        </AnimatePresence>
      </ul>
    </ItemsListStyles>
  );
};

export default memo(ItemsList);
