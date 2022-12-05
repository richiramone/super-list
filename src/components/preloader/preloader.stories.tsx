import { useAtom } from 'jotai';
import React from 'react';
import { isLoadingAtom } from '../../atoms';
import Preloader from './preloader';

export default {
  title: 'Components/Preloader',
  component: Preloader,
};

export const ActivePreloader = () => {
  const [, setIsLoading] = useAtom(isLoadingAtom);
  setIsLoading(true);

  return <Preloader />;
};
