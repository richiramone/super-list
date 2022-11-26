import { connect } from '@planetscale/database';

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
