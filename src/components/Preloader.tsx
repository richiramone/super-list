function Preloader() {
  return (
    <div className="loading-bg">
      <div className="loading-box">
        <svg viewBox="0 0 32 32">
          <use xlinkHref="#shape-smiley"></use>
        </svg>
      </div>
    </div>
  );
}

export default Preloader;
