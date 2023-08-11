import { useAtom } from 'jotai';
import { memo } from 'react';
import { authorAtom } from '../../atoms';
import { Button } from '@material-tailwind/react';

const UserSelector: React.FC = () => {
  const [, setAuthorAtom] = useAtom(authorAtom);

  const setAuthor = (author: string) => {
    localStorage.setItem('author', author);
    setAuthorAtom(author);
  };

  return (
    <div data-testid="userSelector" className="fixed top-40 flex w-full justify-center">
      <ul>
        <li className="mb-6">
          <Button
            data-testid="lucasButton"
            onClick={() => setAuthor('lucas')}
            className="mb-4 w-80 rounded-full bg-cyan-500 py-3 px-6 text-xl font-bold text-white drop-shadow-lg hover:bg-cyan-300"
          >
            <span className="drop-shadow-md">Lucas</span>
          </Button>
        </li>
        <li>
          <Button
            data-testid="annaButton"
            onClick={() => setAuthor('anna')}
            className="w-80 rounded-full  bg-pink-500 py-3 px-6 text-xl font-bold text-white drop-shadow-lg hover:bg-pink-400"
          >
            <span className="drop-shadow-md">Anna</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default memo(UserSelector);
