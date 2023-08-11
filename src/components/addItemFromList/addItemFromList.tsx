import { useAtom } from 'jotai';
import { memo, useRef, useState } from 'react';
import { authorAtom, isLoadingAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { basicItems, category } from './itemsList';
import { Button, Checkbox } from '@material-tailwind/react';
import { IItem } from '../../interfaces';
import { itemsAtom } from '../itemsList/itemsList';
import { hasDuplicatedValue } from '../../utilities';
import { insertMultipleItems } from '../../server/db-client';

interface IFormTarget {
  reset: Function;
}

const AddItemFromList: React.FC = () => {
  const [author] = useAtom(authorAtom);
  const [items] = useAtom(itemsAtom);
  const [_, setIsLoadingAtom] = useAtom(isLoadingAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOnline] = useAtom(isOnlineAtom);
  const [formData, setFormData] = useState<IItem[]>([]);

  const updateCheckboxesFromListValues = () => {
    const checkboxes = Array.prototype.slice.call(
      formRef.current?.querySelectorAll('[type=checkbox]'),
    );

    checkboxes?.map(checkbox => {
      if (hasDuplicatedValue(items, checkbox.value)) {
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

  const closeDialog = (_?: any, form?: IFormTarget) => {
    dialogRef.current?.close();
    setFormData([]);
    form?.reset();
  };

  const updateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemText = event.target.value;

    if (hasDuplicatedValue(items, itemText)) {
      return;
    }

    setFormData([
      ...formData,
      {
        id: 0,
        author: author,
        text: itemText,
        category: event.target.dataset.category,
      },
    ]);
  };

  const submitForm = async (event: React.FormEvent) => {
    const formDataClone = structuredClone(formData);
    event.preventDefault();
    const formTarget: IFormTarget = event.target as typeof event.target & {
      reset: Function;
    };

    if (formData.length === 0) {
      closeDialog(null, formTarget);
      return;
    }

    setIsLoadingAtom(true);
    closeDialog();

    await insertMultipleItems(formDataClone).then(() => {
      setNeedsRefresh(needsRefresh + 1);
      setIsLoadingAtom(false);
    });
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
          <ol className="m-8">
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
                        <label className="flex h-10 cursor-pointer select-none items-center pl-4 text-lg text-white">
                          {item}
                          <Checkbox
                            data-category={category}
                            value={item}
                            color="indigo"
                            name={`${category}-${itemIndex}`}
                            onChange={updateData}
                            className="h-6 w-6 rounded-full border-none bg-gray-200 transition-all hover:scale-105 hover:before:opacity-0"
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
