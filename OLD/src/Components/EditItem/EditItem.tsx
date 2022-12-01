import { useAtom } from 'jotai';
import { memo } from 'react';
import { needsRefreshAtom } from '../../Atoms';
import { updateItem } from '../../Server/Db/client';

type EditItemProps = {
  id: string;
  value: string;
};

const EditItem: React.FC<{ id: string; value: string }> = ({ id, value }: EditItemProps) => {
  const [needRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const itemText = (event.currentTarget.children[0] as HTMLInputElement).value;

    if (itemText === '') {
      return;
    }

    await updateItem(id, itemText).then(() => {
      setNeedsRefresh(needRefresh + 1);
    });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <form
      className="flex h-auto w-auto max-w-sm cursor-pointer rounded py-0.5 pr-1"
      onSubmit={submitForm}
    >
      <input
        className="m-0 block w-full border-hidden bg-transparent font-normal leading-5 tracking-wide text-white outline-none"
        type="text"
        autoFocus
        defaultValue={value}
      />
    </form>
  );
};

export default memo(EditItem);
