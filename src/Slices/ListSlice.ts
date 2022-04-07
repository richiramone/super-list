import { GetState, SetState } from 'zustand';
import { listApiController } from '../Controllers/ListApiController';
import { IItem, IItems } from '../Interfaces';
import { AppState } from '../Store/UseStore';

export interface IListSlice {
  items: IItems;
  refreshItems: (shouldRenderPreloader?: boolean) => Promise<void>;
  addItem: (itemValue: string) => Promise<void>;
  updateItem: (itemKey: string, updateItemValue: string) => Promise<void>;
  confirmItem: (itemKey: string) => Promise<void>;
  deleteItem: (itemKey: string) => Promise<void>;
  emptyList: () => void;
}

const listSlice = (set: SetState<AppState>, get: GetState<AppState>) => ({
  items: {},
  refreshItems: async (shouldRenderPreloader?: boolean) => {
    if (shouldRenderPreloader) {
      set(state => {
        state.isFetching = true;
      });
    }

    const items = await listApiController.getItems();

    set(state => {
      state.isFetching = false;
      state.items = items;
    });
  },
  addItem: async (itemValue: string) => {
    const newItem: IItem = {
      author: get().author,
      hasQuestionMark: itemValue.includes('?'),
      value: itemValue,
    };

    await listApiController.addItem(newItem);
    const items = await listApiController.getItems();

    set(state => {
      state.items = items;
    });
  },
  updateItem: async (itemKey: string, updateItemValue: string) => {
    const items = get().items;
    const tempItems = { ...items };

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = updateItemValue;
        tempItems[key].hasQuestionMark = updateItemValue.includes('?');
      }

      return tempItems[key];
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]);
    const refreshdItems = await listApiController.getItems();

    set(state => {
      state.items = refreshdItems;
    });
  },
  confirmItem: async (itemKey: string) => {
    const items = get().items;
    const tempItems = { ...items };

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = tempItems[key].value.replace('?', '');
        tempItems[key].hasQuestionMark = false;
      }

      return tempItems[key];
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]);
    const refreshdItems = await listApiController.getItems();

    set(state => {
      state.items = refreshdItems;
    });
  },
  deleteItem: async (itemKey: string) => {
    await listApiController.deleteItem(itemKey);

    const items = await listApiController.getItems();

    set(state => {
      state.items = items;
    });
  },
  emptyList: () => {
    listApiController.emptyList();
    set({ items: {} });
  },
});

export default listSlice;
