function DeleteAllConfirmationDialog() {
  return (
    <div className="deleteAllConfirmationDialog-bg">
      <div className="deleteAllConfirmationDialog-box">
        <h3>Sei sicuro di voler svuotare la lista?</h3>
        <ol>
          <li>
            <button data-trigger-confirmation-cancel>No</button>
          </li>
          <li>
            <button data-trigger-confirmation-confirm>Si</button>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default DeleteAllConfirmationDialog;
