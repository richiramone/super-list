import { useAtom } from 'jotai';
import { memo, useState } from 'react';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { emptyList } from '../../server/db-client';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';

const EmptyListButton: React.FC = () => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const _emptyList = async () => {
    await emptyList().then(() => {
      setNeedsRefresh(needsRefresh + 1);
      handleOpen();
    });
  };

  return (
    <>
      <Dialog size="xs" handler={handleOpen} open={open}>
        <DialogBody className="text-xl font-bold text-gray-800">
          Sei sicuro di voler svuotare la lista?
        </DialogBody>

        <DialogFooter>
          <Button
            className="text-md mr-4 w-24 rounded-full"
            variant="outlined"
            color="blue-gray"
            onClick={handleOpen}
          >
            <span>No</span>
          </Button>
          <Button
            className="text-md w-24 rounded-full"
            variant="gradient"
            color="cyan"
            onClick={_emptyList}
          >
            <span>Si</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Button
        onClick={handleOpen}
        variant="text"
        data-testid="emptyListButton"
        className="my-0 mx-5 h-8 w-8 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
        type="button"
        disabled={!isOnline}
      >
        <svg
          className="h-8 w-8 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </Button>
    </>
  );
};

export default memo(EmptyListButton);
