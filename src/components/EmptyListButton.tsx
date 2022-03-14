function EmptyListButton() {
  return (
    <button className="emptyListButton">
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </button>
  );
}

export default EmptyListButton;
