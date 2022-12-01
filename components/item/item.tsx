import EditItem from '../editItem';
import DeleteItemButton from '../deleteItemButton';
import { useAtom } from 'jotai';
import { memo, useState } from 'react';
import { isOnlineAtom } from '../../atoms';
import { IItem } from '../../interfaces';
import ConfirmItemButton from '../confirmItemButton';

type ItemProps = {
  id: string;
  item: IItem;
};

const Item: React.FC<{ item: IItem; id: string }> = ({ item, id }: ItemProps) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isOnline] = useAtom(isOnlineAtom);
  const dynamicClassName = [
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
      className={`${dynamicClassName} relative flex cursor-pointer items-center rounded bg-primary py-1 px-2 transition-colors`}
      onBlur={_disableEditingMode}
    >
      {isBeingEdited && <EditItem id={id} value={item.text} />}

      {!isBeingEdited && (
        <span
          onClick={_setIsBeingEdited}
          className="m-0 w-auto bg-transparent tracking-wide text-white"
        >
          {item.text}
        </span>
      )}

      {!!item.hasQuestionMark && <ConfirmItemButton id={id} value={item.text} />}

      {<DeleteItemButton id={id} />}
    </div>
  );
};

export default memo(Item);
