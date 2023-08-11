import { useAtom } from 'jotai';
import { memo } from 'react';
import { needsRefreshAtom } from '../../atoms';
import { updateItem } from '../../server/db-client';

type EditItemProps = {
  id: string;
  value: string;
};

const EditItem: React.FC<{ id: string; value: string }> = ({ id, value }: EditItemProps) => {
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const itemText = (event.currentTarget.children[0] as HTMLInputElement).value;

    if (itemText === '') {
      return;
    }

    await updateItem(id, itemText).then(() => {
      setNeedsRefresh(needsRefresh + 1);
    });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <form
      data-testid="editItemForm"
      className="flex h-auto w-auto max-w-sm cursor-pointer rounded py-0.5 pr-1"
      onSubmit={submitForm}
    >
      <input
        data-testid="editItemInput"
        className="m-0 block w-full border-hidden bg-transparent text-xl font-normal leading-5 text-white outline-none"
        type="text"
        autoFocus
        defaultValue={value}
      />
    </form>
  );
};

export default memo(EditItem);
