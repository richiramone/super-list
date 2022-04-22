import { GetState } from 'zustand';
import { NamedSet } from 'zustand/middleware';
import { listApiController } from '../Controllers/ListApiController';
import { IItem, IItems } from '../Interfaces';
import { AppState } from '../Store/UseStore';
import { hasDuplicatedValue } from '../Utilities';

export interface IListSlice {
  items: IItems;
  refreshItems: (shouldRenderPreloader?: boolean) => Promise<void>;
  createNewList: () => Promise<void>;
  addItem: (itemValue: string) => Promise<void>;
  updateItem: (itemKey: string, updateItemValue: string) => Promise<void>;
  confirmItem: (itemKey: string) => Promise<void>;
  deleteItem: (itemKey: string) => Promise<void>;
  emptyList: () => void;
}

const listSlice = (set: NamedSet<AppState>, get: GetState<AppState>) => ({
  items: {},
  refreshItems: async (shouldRenderPreloader?: boolean) => {
    if (shouldRenderPreloader) {
      set(
        state => {
          state.isFetching = true;
        },
        false,
        'fetching',
      );
    }

    const items = await listApiController.getItems();

    set(
      state => {
        state.isFetching = false;
        state.items = items;
      },
      false,
      'refreshItems',
    );
  },
  createNewList: async () => {
    set(
      state => {
        state.isFetching = true;
      },
      false,
      'fetching',
    );

    await listApiController.createNewList();
    const items = await listApiController.getItems();

    set(
      state => {
        state.isFetching = false;
        state.items = items;
      },
      false,
      'createNewList',
    );
  },
  addItem: async (itemValue: string) => {
    const newItem: IItem = {
      author: get().author,
      hasQuestionMark: itemValue.includes('?'),
      value: itemValue,
      isDuplicated: hasDuplicatedValue(get().items, itemValue),
    };

    await listApiController.addItem(newItem);
    const items = await listApiController.getItems();

    set(
      state => {
        state.items = items;
      },
      false,
      'addItem',
    );
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

    set(
      state => {
        state.items = refreshdItems;
      },
      false,
      'updateItem',
    );
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

    set(
      state => {
        state.items = refreshdItems;
      },
      false,
      'confirmItem',
    );
  },
  deleteItem: async (itemKey: string) => {
    await listApiController.deleteItem(itemKey);

    const items = await listApiController.getItems();

    set(
      state => {
        state.items = items;
      },
      false,
      'deleteItem',
    );
  },
  emptyList: () => {
    listApiController.emptyList();
    set({ items: {} }, false, 'emptyList');
  },
});

export default listSlice;
