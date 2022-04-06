import { listApiController } from '../Controllers/ListApiController';
import { IItems } from '../Interfaces/AppInterfaces';

export const reverseItems = (items: IItems) => {
  return Object.keys(items)
    .reverse()
    .reduce((a: IItems, key) => {
      a[key] = items[key];
      return a;
    }, {});
};

const getAuthor = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorFromParams = urlParams.has('author') ? urlParams.get('author') : 'lucas';

  return authorFromParams ? authorFromParams : 'lucas';
};
export const author = getAuthor();

export const getItemsFromLocalStorage = () => {
  const localStorageItems = localStorage.getItem('items');

  return localStorageItems === null ? {} : JSON.parse(localStorageItems);
};

export const updateLocalStorage = (items: IItems) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const baseRefreshItems = async () => {
  const items = await listApiController.getItems();

  updateLocalStorage(items);

  return items;
};
