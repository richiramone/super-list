import React, { memo } from 'react';
import { basicItems, category } from './itemsList';

const BasicItemsList: React.FC = () => {
  return (
    <dialog>
      <ol>
        {Object.values(category).map((category, index) => (
          <li key={index}>
            <h3>{category}</h3>

            <ol>
              {basicItems[category].map((item, _index) => (
                <li key={_index}>
                  <input type="checkbox" value={item} data-category={category} />
                  <button type="button">{item}</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <footer>
        <button type="button">Update list</button>
      </footer>
    </dialog>
  );
};

export default memo(BasicItemsList);
