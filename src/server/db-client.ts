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
  // TODO get the category
  await dbConnection().execute(`
    INSERT INTO Items
      (author, text, hasQuestionMark, hasDuplicate, category)
    VALUES
      (
        '${item.author}',
        '${sanitize(item.text)}',
        ${item.text.includes('?')},
        ${item.hasDuplicate},
        ${item.category}
      )`);

  if (item.hasDuplicate) {
    await dbConnection().execute(
      `UPDATE
        Items
      SET
        hasDuplicate = true
      WHERE
        text LIKE '%${item.text}%'`,
    );
  }

  return Promise.resolve();
};

export const insertMultipleItems = async (items: IItem[]) => {
  const values: string[] = [];

  items.map(item => {
    values.push(`
    (
      '${item.author}',
      '${sanitize(item.text)}',
      '${item.category}'
    )`);
  });

  await dbConnection().execute(`
    INSERT INTO Items
      (author, text, category)
    VALUES
      ${values.toString()}`);

  return Promise.resolve();
};

export const updateItem = async (id: string, text: string) => {
  return await dbConnection().execute(`
    UPDATE
      Items
    SET
      text = '${sanitize(text)}',
      hasQuestionMark = ${text.includes('?')}
    WHERE
      id = ${id}`);
};

export const deleteItem = async (id: string) => {
  return await dbConnection().execute(`DELETE FROM Items WHERE id = ${id}`);
};

export const emptyList = async () => {
  return await dbConnection().execute('DELETE FROM Items WHERE id > 0');
};
