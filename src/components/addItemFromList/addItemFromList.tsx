import { useAtom } from 'jotai';
import { memo, useEffect, useRef } from 'react';
import { authorAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { basicItems, category } from './itemsList';
import { Button, Checkbox } from '@material-tailwind/react';
import { itemsAtom } from '../itemsList/itemsList';
import { hasDuplicatedValue } from '../../utilities';
import { deleteItemByText, insertItem, updateItemHasQuestionMark } from '../../server/db-client';

const AddItemFromList: React.FC = () => {
  const [author] = useAtom(authorAtom);
  const [items] = useAtom(itemsAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOnline] = useAtom(isOnlineAtom);

  useEffect(() => {
    formRef.current?.reset;
  }, [needsRefresh]);

  const updateCheckboxesFromListValues = () => {
    const checkboxes = Array.prototype.slice.call(
      formRef.current?.querySelectorAll('[type=checkbox]'),
    );

    checkboxes?.map(checkbox => {
      const hasQuestionMark = checkbox.dataset.hasQuestionMark === 'true';

      if (hasDuplicatedValue(items, checkbox.value, hasQuestionMark)) {
        checkbox.checked = true;
      }
    });
  };

  const handleBgClick = (event: any) => {
    if (event.target === event.currentTarget) {
      event.currentTarget?.close();
    }
  };

  const openDialog = () => {
    updateCheckboxesFromListValues();
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    formRef.current?.reset();
  };

  const addItem = async (item: EventTarget & HTMLInputElement, hasQuestionMark: boolean) => {
    await insertItem({
      author: author,
      text: item.value,
      category: item.dataset.category,
      hasQuestionMark: hasQuestionMark,
    });
  };

  const removeItem = async (itemText: string) => {
    await deleteItemByText(itemText);
  };

  const updateItem = async (item: EventTarget & HTMLInputElement, hasQuestionMark: boolean) => {
    await updateItemHasQuestionMark(item.value, hasQuestionMark);
  };

  const uncheckSibling = (target: EventTarget & HTMLInputElement) => {
    const hasQuestionMark = target.dataset.hasQuestionMark === 'true';
    const siblingQuery = `[name="${target.name}"][data-has-question-mark="${!hasQuestionMark}"]`;
    const checkbox = formRef.current?.querySelector(siblingQuery) as HTMLInputElement;

    checkbox.checked = false;
  };

  const updateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasQuestionMark = event.target.dataset.hasQuestionMark === 'true';

    uncheckSibling(event.target);

    if (!event.target.checked) {
      removeItem(event.target.value);
    } else if (hasDuplicatedValue(items, event.target.value)) {
      updateItem(event.target, hasQuestionMark);
    } else {
      addItem(event.target, hasQuestionMark);
    }

    setNeedsRefresh(needsRefresh + 1);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    closeDialog();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={handleBgClick}
        className="fixed m-auto h-screen min-h-screen w-screen max-w-6xl bg-white px-0 py-4 backdrop:bg-transparent xl:backdrop:bg-black xl:backdrop:bg-opacity-60"
      >
        <header className="relative">
          <button
            className="fixed right-4 top-10 xl:right-auto xl:ml-[1100px]"
            type="button"
            onClick={closeDialog}
          >
            <svg
              className="mr-2 h-6 w-6 text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </header>

        <form onSubmit={submitForm} ref={formRef}>
          <ol className="m-12 xl:mt-0">
            {Object.values(category).map((category, categoryIndex) => {
              if (category.toLocaleLowerCase() === 'altri') {
                return;
              }

              return (
                <li key={categoryIndex}>
                  <h3 className="mb-2 px-1 py-1 text-center text-xl font-bold uppercase text-indigo-600">
                    {category}
                  </h3>

                  <ol className="mb-8 flex flex-wrap justify-center gap-2">
                    {basicItems[category].map((item, itemIndex) => (
                      <li
                        key={`li-item-${category}-${itemIndex}`}
                        className="relative inline-block rounded-full border-2 border-cyan-500 bg-cyan-500"
                      >
                        <label className="flex h-10 cursor-pointer select-none items-center pl-2 pr-1 text-lg text-white">
                          {item}
                          <Checkbox
                            data-category={category}
                            value={`${item}`}
                            color="amber"
                            name={`${category}-${itemIndex}`}
                            data-has-question-mark="true"
                            onChange={updateData}
                            containerProps={{
                              className: 'pr-1 pl-2',
                            }}
                            className="m-0 h-6 w-6 rounded-full border-none bg-gray-200 p-0 transition-all hover:scale-105 hover:before:opacity-0"
                          />
                          <Checkbox
                            data-category={category}
                            value={item}
                            color="indigo"
                            name={`${category}-${itemIndex}`}
                            data-has-question-mark="false"
                            onChange={updateData}
                            containerProps={{
                              className: 'px-0',
                            }}
                            className="m-0 h-6 w-6 rounded-full border-none bg-gray-200 p-0 transition-all hover:scale-105 hover:before:opacity-0"
                          />
                        </label>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ol>

          <footer className="mx-auto mb-6 flex max-w-sm justify-center px-6">
            <Button
              size="lg"
              variant="gradient"
              color="indigo"
              fullWidth
              ripple={true}
              type="submit"
              className="group relative flex items-center justify-center gap-3 overflow-hidden pr-[72px] text-lg font-bold"
            >
              Aggiungi
              <span className="absolute right-0 grid h-full w-12 place-items-center bg-indigo-600 transition-colors group-hover:bg-light-blue-700">
                <svg
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </span>
            </Button>
          </footer>
        </form>
      </dialog>

      <button
        className="mx-5 my-0 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
        type="button"
        onClick={openDialog}
        disabled={!isOnline}
      >
        <svg
          className="h-8 w-8 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </>
  );
};

export default memo(AddItemFromList);
