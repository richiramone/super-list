import { useAtom } from 'jotai';
import { memo } from 'react';
import { isLoadingAtom } from '../../atoms';

const Preloader: React.FC = () => {
  const [isLoading] = useAtom(isLoadingAtom);
  const dynamicClasses = isLoading ? 'flex' : 'hidden';

  return (
    <div
      data-testid="preloader"
      className={`${dynamicClasses} fixed top-0 left-0 z-50 h-full w-full items-center justify-center bg-modal`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-center shadow-lg">
        <svg className="w-8 animate-spin fill-primary" viewBox="0 0 1024 1024">
          <path d="M512 1024c282.77 0 512-229.23 512-512s-229.23-512-512-512-512 229.23-512 512 229.23 512 512 512zM512 96c229.75 0 416 186.25 416 416s-186.25 416-416 416-416-186.25-416-416 186.25-416 416-416zM512 598.76c115.95 0 226.23-30.806 320-84.92-14.574 178.438-153.128 318.16-320 318.16-166.868 0-305.422-139.872-320-318.304 93.77 54.112 204.050 85.064 320 85.064zM256 352c0-53.019 28.654-96 64-96s64 42.981 64 96c0 53.019-28.654 96-64 96s-64-42.981-64-96zM640 352c0-53.019 28.654-96 64-96s64 42.981 64 96c0 53.019-28.654 96-64 96s-64-42.981-64-96z"></path>
        </svg>
      </div>
    </div>
  );
};

export default memo(Preloader);
