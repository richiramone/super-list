import { useAtom } from 'jotai';
import React, { useRef, useEffect, memo } from 'react';
import { authorAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { IItem } from '../../interfaces';
import { insertItem } from '../../server/db-client';
import { hasDuplicatedValue } from '../../utilities';
import { itemsAtom } from '../itemsList/itemsList';

const AddItemForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasRecentlyAddedItems = useRef(false);
  const [author] = useAtom(authorAtom);
  const [isOnline] = useAtom(isOnlineAtom);
  const [items] = useAtom(itemsAtom);
  const [needRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const itemText = (event.currentTarget.children[0] as HTMLInputElement).value;

    hasRecentlyAddedItems.current = false;

    if (itemText === '') {
      return;
    }

    const item: IItem = {
      id: 0,
      author: author,
      text: itemText,
      hasDuplicate: hasDuplicatedValue(items, itemText),
      hasQuestionMark: itemText.includes('?'),
    };

    await insertItem(item).then(() => {
      hasRecentlyAddedItems.current = true;
      setNeedsRefresh(needRefresh + 1);
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (hasRecentlyAddedItems.current) {
      inputRef.current?.focus();
      hasRecentlyAddedItems.current = false;
    }
  });

  return (
    <form
      data-testid="addItemForm"
      className="flex h-auto w-auto max-w-sm cursor-pointer rounded bg-primary py-1.5 px-2"
      onSubmit={submitForm}
    >
      <input
        data-testid="addItemInput"
        className="m-0 block w-full border-0 bg-transparent font-normal leading-5 tracking-wide text-white outline-none placeholder:italic placeholder:text-stone-200 disabled:opacity-50"
        data-add-item-input
        ref={inputRef}
        type="text"
        placeholder="altro..."
        disabled={!isOnline}
      />
    </form>
  );
};

export default memo(AddItemForm);
