import EditItem from '../EditItem';
import DeleteItemButton from '../DeleteItemButton';
import ConfirmItemButton from '../ConfirmItemButton';
import { atom, useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom } from '../../Atoms';
import { IItem } from '../../Interfaces';

type ItemProps = {
  id: string;
  item: IItem;
};

export const isBeingEditedAtom = atom<boolean>(false);
export const isBeingDeletedAtom = atom<boolean>(false);

const Item: React.FC<{ item: IItem; id: string }> = ({ item, id }: ItemProps) => {
  const [, setIsBeingEdited] = useAtom(isBeingEditedAtom);
  const [isOnline] = useAtom(isOnlineAtom);

  const isBeingEditedClassName = isBeingEditedAtom ? 'hidden' : '';

  const dynamicClassName = [
    isBeingDeletedAtom ? 'bg-item-was-deleted' : '',
    item.hasDuplicate ? 'bg-item-is-duplicated' : '',
    item.hasQuestionMark ? 'bg-item-has-question-mark' : '',
    item.author !== 'lucas' ? 'bg-item-is-anna' : '',
  ].join(' ');

  const _disableEditingMode = () => {
    if (isOnline) {
      setTimeout(() => setIsBeingEdited(false), 100);
    }
  };

  const _setIsBeingEdited = () => {
    if (isOnline) {
      setIsBeingEdited(true);
    }
  };

  return (
    <div
      className={`relative flex cursor-pointer items-center rounded bg-primary py-1 px-2 transition-colors ${dynamicClassName}`}
      onBlur={_disableEditingMode}
    >
      {isBeingEditedAtom && <EditItem id={id} value={item.text} />}

      {!isBeingEditedAtom && (
        <span
          onClick={_setIsBeingEdited}
          className={`${isBeingEditedClassName} m-0 w-auto bg-transparent tracking-wide text-white`}
        >
          {item.text}
        </span>
      )}

      {/* {item.hasQuestionMark && <ConfirmItemButton id={id} />} */}

      {<DeleteItemButton id={id} />}
    </div>
  );
};

export default memo(Item);
