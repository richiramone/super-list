import { useAtom } from 'jotai';
import React, { useRef, useEffect, memo } from 'react';
import { authorAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { IItem } from '../../interfaces';
import { insertItem } from '../../server/db-client';

const AddItemForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [author] = useAtom(authorAtom);
  const [isOnline] = useAtom(isOnlineAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    let itemText = (event.currentTarget.children[0] as HTMLInputElement).value;

    if (itemText === '') {
      return;
    }

    const hasQuestionMark = itemText.includes('?');
    itemText = hasQuestionMark ? itemText.slice(0, -1) : itemText;

    const item: IItem = {
      id: 0,
      author: author,
      text: itemText,
      category: 'not_x_now',
      hasQuestionMark: hasQuestionMark,
    };

    await insertItem(item).then(() => {
      setNeedsRefresh(needsRefresh + 1);
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (needsRefresh === 0) return;
    inputRef.current?.focus();
  }, [needsRefresh]);

  return (
    <form
      data-testid="addItemForm"
      className="flex h-auto w-auto max-w-sm cursor-pointer rounded bg-gray-500 px-3 py-3"
      onSubmit={submitForm}
    >
      <input
        data-testid="addItemInput"
        className="m-0 block w-full border-0 bg-transparent text-xl font-normal leading-5 text-white outline-none placeholder:italic placeholder:text-white disabled:opacity-50"
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
