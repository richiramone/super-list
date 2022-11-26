export const getAuthor = () => {
  const params = new URLSearchParams(window.location.search);
  const userFromQS = params.has('user') ? params.get('user') : 'lucas';

  return userFromQS ? userFromQS : 'lucas';
};
