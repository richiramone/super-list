import Item from '../Item';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { IItem, isLoadingAtom } from '../../Atoms';

const ItemsList: React.FC = () => {
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [items, setItems] = useState([]);

  fetch('https://randomuser.me/api')
    .then(response => response.json())
    .then(items => {
      setIsLoading(false);
      setItems(items);
    });

  return (
    <div className="mt-4 mr-0 mb-20">
      <ul className="m0 p0 flex list-none flex-wrap items-center justify-start">
        <AnimatePresence>
          {items.map((item: IItem) => (
            <motion.li
              className="mt-0 ml-0 mr-2 mb-2 h-auto w-auto max-w-sm"
              id={item.id.toString()}
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
