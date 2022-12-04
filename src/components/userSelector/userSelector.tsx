import { useAtom } from 'jotai';
import { memo } from 'react';
import { authorAtom } from '../../atoms';

const UserSelector: React.FC = () => {
  const [, setAuthorAtom] = useAtom(authorAtom);

  const setAuthor = (author: string) => {
    localStorage.setItem('author', author);
    setAuthorAtom(author);
  };

  return (
    <div data-testid="userSelector" className="fixed top-32 flex w-full justify-center">
      <ul>
        <li className="mb-6">
          <button
            data-testid="lucasButton"
            type="button"
            onClick={() => setAuthor('lucas')}
            className="w-80 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 px-6 text-xl font-bold text-white drop-shadow-lg hover:from-pink-500 hover:to-yellow-500"
          >
            <span className="drop-shadow-md">Lucas</span>
          </button>
        </li>
        <li>
          <button
            data-testid="annaButton"
            type="button"
            onClick={() => setAuthor('anna')}
            className="w-80 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-6 text-xl font-bold text-white drop-shadow-lg hover:from-pink-500 hover:to-yellow-500"
          >
            <span className="drop-shadow-md">Anna</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default memo(UserSelector);
