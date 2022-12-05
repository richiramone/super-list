import { useAtom } from 'jotai';
import React from 'react';
import { isLoadingAtom } from '../../atoms';
import Preloader from './preloader';

export default {
  title: 'Preloader',
  component: Preloader,
};

const PreloaderWithHooks = () => {
  const [, setIsLoading] = useAtom(isLoadingAtom);
  setIsLoading(true);

  return <Preloader />;
};

export const Primary = {
  render: () => <PreloaderWithHooks />,
};
