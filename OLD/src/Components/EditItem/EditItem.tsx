import styled from 'styled-components';
import { useContext, useEffect, useRef, memo, useCallback } from 'react';
import { ItemContext } from '../../Contexts/ItemContext';
import useStore from '../../Store/UseStore';

type EditItemProps = {
  id: string;
  value: string;
};

const EditItemStyles = styled.input`
  display: none;
  margin: 0;
  width: auto;
  background: none;
  border: 0;
  outline: none;
  font-weight: normal;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #fff;
`;

const EditItem: React.FC<{ id: string; value: string }> = ({ id, value }: EditItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { enableEditingMode, disableEditingMode } = useContext(ItemContext);
  const updateItem = useStore(useCallback(state => state.updateItem, []));

  const tryUpdateItem = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.currentTarget.value === '') {
      return;
    }

    disableEditingMode();
    await updateItem(id, event.currentTarget.value);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.value = value;
  }, [value]);

  return (
    <EditItemStyles
      type="text"
      autoFocus
      defaultValue={value}
      ref={inputRef}
      onKeyPress={tryUpdateItem}
      onClick={enableEditingMode}
    />
  );
};

export default memo(EditItem);
