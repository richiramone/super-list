import { useAtom } from 'jotai';
import { useEffect, useRef, memo } from 'react';
import { isBeingEditedAtom } from '../Item/Item';

type EditItemProps = {
  id: string;
  value: string;
};

const EditItem: React.FC<{ id: string; value: string }> = ({ id, value }: EditItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isBeingEdited, setIsBeingEdited] = useAtom(isBeingEditedAtom);

  const tryUpdateItem = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.currentTarget.value === '') {
      return;
    }

    setIsBeingEdited(false);
    // await updateItem(id, event.currentTarget.value);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.value = value;
  }, [value]);

  const inputClassName = isBeingEdited ? 'block w-full' : '';

  return (
    <input
      className={`${inputClassName} m-0 hidden w-auto border-hidden bg-transparent font-normal leading-5 tracking-wide text-white outline-none`}
      type="text"
      autoFocus
      defaultValue={value}
      ref={inputRef}
      onKeyPress={tryUpdateItem}
      onClick={() => setIsBeingEdited(true)}
    />
  );
};

export default memo(EditItem);
