import { connect } from '@planetscale/database';
import { IItem } from '../../Interfaces';

const dbConnection = () => {
  const config = {
    host: 'aws.connect.psdb.cloud',
    username: '20m3farrdw6wa2kjs6hw',
    password: 'pscale_pw_lO99FwAgdgnkHGABzpkwLzYN8Hk6WvH9maxNe7H8pl3',
  };
  return connect(config);
};

export const getItems = async () => {
  return await dbConnection().execute('SELECT * FROM Items');
};

export const insertItem = async (item: IItem) => {
  await dbConnection().execute(`
    INSERT INTO Items
      (author, text, hasQuestionMark, hasDuplicate)
    VALUES
      (
        '${item.author}',
        '${item.text}',
        ${item.text.includes('?')},
        ${item.hasDuplicate}
      )`);

  if (item.hasDuplicate) {
    await dbConnection().execute(
      `UPDATE Items SET hasDuplicate = true WHERE text LIKE '%${item.text}%'`,
    );
  }

  return Promise.resolve();
};
