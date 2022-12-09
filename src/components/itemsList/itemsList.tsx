import Item from '../item';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { isLoadingAtom, needsRefreshAtom } from '../../atoms';
import { getItems } from '../../server/db-client';
import { IItem } from '../../interfaces';
import { areItemsDifferent } from '../../utilities';

export const itemsAtom = atom<IItem[]>([]);

const ItemsList: React.FC = () => {
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [needsRefresh] = useAtom(needsRefreshAtom);
  const [items, setItems] = useAtom(itemsAtom);

  const loadItems = async () => {
    await getItems().then(dbResult => {
      setIsLoading(false);

      const freshItems = dbResult as IItem[];

      if (areItemsDifferent(items, freshItems)) {
        setItems(freshItems);
      }
    });
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-`line react-hooks/exhaustive-deps
  }, [needsRefresh]);

  return (
    <div className="mt-4 mr-0 mb-20">
      <ul className="m0 p0 flex list-none flex-wrap items-center justify-start">
        <AnimatePresence>
          {items.map((item: IItem) => (
            <motion.li
              className="mt-0 ml-0 mr-2 mb-2 h-auto w-auto max-w-sm"
              key={item.id.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Item item={item} id={item.id.toString()} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ItemsList;
