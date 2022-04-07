import { IItems } from '../Interfaces/AppInterfaces';

export const reverseItems = (items: IItems) => {
  return Object.keys(items)
    .reverse()
    .reduce((a: IItems, key) => {
      a[key] = items[key];
      return a;
    }, {});
};

export const getAuthor = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorFromParams = urlParams.has('author') ? urlParams.get('author') : 'lucas';

  return authorFromParams ? authorFromParams : 'lucas';
};
