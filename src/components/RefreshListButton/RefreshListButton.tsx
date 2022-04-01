import styled from "styled-components";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { itemsActions } from "../../state";
import { ITEMS_REQUESTED } from "../../interfaces";

const RefreshListButtonStyles = styled.button`
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;
`;

const RefreshListButton: React.FC = () => {
  const dispatch = useDispatch();
  const { refreshList } = bindActionCreators(itemsActions, dispatch);

  return (
    <RefreshListButtonStyles
      onClick={() => {
        dispatch({
          type: ITEMS_REQUESTED,
        });

        dispatch(refreshList());
      }}
    >
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </RefreshListButtonStyles>
  );
};

export default memo(RefreshListButton);
