import styled from "styled-components";

function EditItem() {
  const EditItem = styled.input`
    display: none;
    margin: 0;
    width: auto;
    background: none;
    border: 0;
    outline: none;
    font-size: 18px;
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: #fff;

    & .editing {
      // todo
      display: block;
      width: 100%;
    }

    @media only screen and (min-width: 768px) {
      // todo
      width: 220%;
      display: block;
      width: 100%;
    }
  `;

  return <EditItem type="text" value="trippa" readOnly />;
}

export default EditItem;
