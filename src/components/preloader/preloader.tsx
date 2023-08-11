import { useAtom } from 'jotai';
import { memo } from 'react';
import { isLoadingAtom } from '../../atoms';
import { Spinner } from '@material-tailwind/react';

const Preloader: React.FC = () => {
  const [isLoading] = useAtom(isLoadingAtom);
  const dynamicClasses = isLoading ? 'flex' : 'hidden';

  return (
    <div
      data-testid="preloader"
      className={`${dynamicClasses} fixed top-0 left-0 z-50 h-full w-full items-center justify-center bg-modal`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-center shadow-lg">
        <Spinner color="cyan" className="h-10 w-10" />
      </div>
    </div>
  );
};

export default memo(Preloader);
