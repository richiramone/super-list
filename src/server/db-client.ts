import { connect } from '@planetscale/database';
import { IItem } from '../interfaces';
import { sanitize } from '../utilities';

export const dbConnection = () => {
  const config = {
    host: import.meta.env.VITE_HOST,
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD,
  };

  return connect(config);
};

export const getItems = async () => {
  return await dbConnection()
    .execute('SELECT * FROM Items ORDER BY id DESC')
    .then(items => {
      return items.rows;
    });
};

export const insertItem = async (item: IItem) => {
  return await dbConnection().execute(`
    INSERT INTO Items
      (author, text, hasQuestionMark, category)
    VALUES
      (
        '${item.author}',
        '${sanitize(item.text)}',
        ${item.hasQuestionMark},
        '${item.category}'
      )`);
};

export const updateItem = async (id: string, text: string, hasQuestionMark: boolean) => {
  return await dbConnection().execute(`
    UPDATE
      Items
    SET
      text = '${sanitize(text)}',
      hasQuestionMark = ${hasQuestionMark}
    WHERE
      id = ${id}`);
};

export const updateItemHasQuestionMark = async (text: string, hasQuestionMark: boolean) => {
  return await dbConnection().execute(`
    UPDATE
      Items
    SET
      text = '${sanitize(text)}',
      hasQuestionMark = ${hasQuestionMark}
    WHERE
      text = '${sanitize(text)}'`);
};

export const deleteItem = async (id: string) => {
  return await dbConnection().execute(`DELETE FROM Items WHERE id = ${id}`);
};

export const deleteItemByText = async (text: string) => {
  return await dbConnection().execute(`DELETE FROM Items WHERE text = '${text}'`);
};

export const emptyList = async () => {
  return await dbConnection().execute('DELETE FROM Items WHERE id > 0');
};
