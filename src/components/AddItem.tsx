import styled from "styled-components";
import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";

function AddItem() {
  const AddItem = styled.aside`
    margin: 5rem 0.5rem 0;
    display: flex;
    padding: 0.3rem 0.5rem;
    max-width: 390px;
    width: auto;
    height: auto;
    border-radius: 4px;
    background: #09f;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    input {
      display: block;
      width: 100%;
      margin: 0;
      outline: none;
      border: 0;
      font-weight: normal;
      background: none;
      color: #fff;
      letter-spacing: 0.02em;
      font-size: 18px;
      line-height: 1.2;
    }
  `;

  const { addItem } = useContext(ListContext);

  const tryAddItem = (event: SyntheticEvent): void => {
    if (event.which !== 13 && event.which !== 9) {
      return;
    }

    if (event.currentTarget.value !== "") {
      addItem(event.currentTarget.value);
    }
  };

  return (
    <AddItem>
      <input onInput={tryAddItem} type="text" placeholder="altro..." />
    </AddItem>
  );
}

export default AddItem;
