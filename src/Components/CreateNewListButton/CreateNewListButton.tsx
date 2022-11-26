import { memo, useCallback } from 'react';

const CreateNewListButton: React.FC = () => {
  // const createNewList = useStore(state => state.createNewList);
  // const renderConfirmationDialog = useStore(state => state.renderConfirmationDialog);
  // const confirmationDialogCancelAction = useStore(state => state.confirmationDialogCancelAction);
  const isOnline = true;

  const _createNewList = () => {
    // createNewList();
    // confirmationDialogCancelAction();
  };

  const _renderConfirmationDialog = () => {
    // renderConfirmationDialog('Sei sicuro di voler creare una nuova lista?', _createNewList);
  };

  const mostUsedItemsAtom: string[] = [
    'aceto',
    'ammorbidente',
    'banana',
    'birra',
    'brillantante',
    'brodo',
    'burro',
    'capriccio',
    'carne',
    'carta igienica',
    'cordon blue',
    'cotto cubetti',
    'crackers',
    'crudo',
    'dentifricio',
    'dentifricio agnese',
    'deodorante',
    'fragole',
    'frutta da ciucciare',
    'frutta secca',
    'gnocchi',
    'gorgonzola',
    'gramigna',
    'heladito bebe',
    'insalata pronta',
    'kiwi',
    'latte',
    'latte x2',
    'latte x3',
    'mandarini',
    'mela',
    'mirtilli',
    'nduja',
    'olio cani',
    'olive',
    'orecchiette',
    'pann',
    'pasta ripiena',
    'pasta sfoglia',
    'peco grat x2',
    'peco grat x3',
    'peco sardo',
    'permigiano',
    'pesto',
    'philadelphia',
    'pomodori',
    'popcorn',
    'riso',
    'riso cani',
    'roque',
    'salame',
    'sale fino',
    'sale grosso',
    'salsa orecchiette',
    'salsiccia',
    'sapone lavastoviglie',
    'sapone lavatrice',
    'scalpppine',
    'scotex',
    'shampo',
    'spremuta',
    'stracchino',
    'svizzera',
    'svizzera pesce',
    'tonno',
    'tortellini',
    'uova',
    'vino cucina',
    'yogurt',
    'yogurt agnese',
    'zucca',
    'zucchero',
    'zucchine',
  ];

  return (
    <button
      className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
      onClick={() => _renderConfirmationDialog()}
      disabled={!isOnline}
    >
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#create-new-list"></use>
      </svg>
    </button>
  );
};

export default memo(CreateNewListButton);
