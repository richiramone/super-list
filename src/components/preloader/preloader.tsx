import { useAtom } from 'jotai';
import { memo } from 'react';
import { isLoadingAtom } from '../../atoms';

const Preloader: React.FC = () => {
  const [isLoading] = useAtom(isLoadingAtom);
  const dynamicClasses = isLoading ? 'flex' : 'hidden';

  return (
    <div
      className={`${dynamicClasses} fixed top-0 left-0 z-50 h-full w-full items-center justify-center bg-modal`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-center shadow-lg">
        <svg className="w-8 animate-spin fill-primary" viewBox="0 0 32 32">
          <use xlinkHref="#shape-smiley"></use>
        </svg>
      </div>
    </div>
  );
};

export default memo(Preloader);
