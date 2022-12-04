import { describe, expect, it } from 'vitest';
import { connect } from '@planetscale/database';
import { dbConnection, deleteItem, emptyList, getItems, insertItem, updateItem } from './db-client';

vi.mock('@planetscale/database', () => {
  return {
    connect: vi.fn().mockReturnValue({
      execute: vi.fn().mockResolvedValue({ rows: [1, 2, 3] }),
    }),
  };
});

describe('dbConnection', () => {
  it('should return connect with proper settings', () => {
    dbConnection();
    expect(connect).toHaveBeenCalledOnce();
    expect(connect).toHaveBeenCalledWith({
      host: 'aws.connect.psdb.cloud',
      username: '20m3farrdw6wa2kjs6hw',
      password: 'pscale_pw_lO99FwAgdgnkHGABzpkwLzYN8Hk6WvH9maxNe7H8pl3',
    });
  });
});

describe('getItems', () => {
  it('should return connect with proper settings', async () => {
    const items = await getItems();

    const getItemsQuery = (connect as any).results[0][1].execute.calls[0][0];

    expect(getItemsQuery).toBe('SELECT * FROM Items ORDER BY id DESC');
    expect(items).toStrictEqual([1, 2, 3]);
  });
});

describe('insertItem', () => {
  it('should insert item and set duplicates to true', async () => {
    const items = await insertItem({
      author: 'lucas',
      hasQuestionMark: true,
      hasDuplicate: true,
      text: 'ham?',
      id: 2,
    });

    const insertItemQuery = (connect as any).results[0][1].execute.calls[0][0];

    expect(insertItemQuery.trim()).toBe(
      `
    INSERT INTO Items
      (author, text, hasQuestionMark, hasDuplicate)
    VALUES
      (
        'lucas',
        'ham?',
        true,
        true
      )
    `.trim(),
    );

    const updateDuplicatedQuery = (connect as any).results[0][1].execute.calls[1][0];

    expect(updateDuplicatedQuery).toStrictEqual(`UPDATE
        Items
      SET
        hasDuplicate = true
      WHERE
        text LIKE '%ham?%'`);
  });

  it('should insert item and NOT set duplicates to true', async () => {
    const items = await insertItem({
      author: 'lucas',
      hasQuestionMark: true,
      hasDuplicate: false,
      text: 'ham?',
      id: 2,
    });

    const insertItemQuery = (connect as any).results[0][1].execute.calls[0][0];

    expect(insertItemQuery.trim()).toBe(
      `
    INSERT INTO Items
      (author, text, hasQuestionMark, hasDuplicate)
    VALUES
      (
        'lucas',
        'ham?',
        true,
        false
      )
    `.trim(),
    );

    const queriesCallCount = (connect as any).results[0][1].execute.callCount;
    expect(queriesCallCount).toBe(1);
  });
});

describe('updateItem', () => {
  it('should update item with hasQuestionMark FALSE', async () => {
    await updateItem('2', 'cheese');

    const query = (connect as any).results[0][1].execute.calls[0][0];

    expect(query.trim()).toBe(
      `UPDATE
      Items
    SET
      text = 'cheese',
      hasQuestionMark = false
    WHERE
      id = 2
    `.trim(),
    );
  });

  it('should update item with hasQuestionMark TRUE', async () => {
    await updateItem('2', 'cheese?');

    const query = (connect as any).results[0][1].execute.calls[0][0];

    expect(query.trim()).toBe(
      `UPDATE
      Items
    SET
      text = 'cheese?',
      hasQuestionMark = true
    WHERE
      id = 2
    `.trim(),
    );
  });

  it('should update item with sanitize text', async () => {
    await updateItem('2', 'che & < ese?');

    const query = (connect as any).results[0][1].execute.calls[0][0];

    expect(query.trim()).toBe(
      `UPDATE
      Items
    SET
      text = 'che &amp; &lt; ese?',
      hasQuestionMark = true
    WHERE
      id = 2
    `.trim(),
    );
  });
});

describe('deleteItem', () => {
  it('should delete proper item', async () => {
    await deleteItem('1');

    const getItemsQuery = (connect as any)``.results[0][1].execute.calls[0][0];

    expect(getItemsQuery).toBe('DELETE FROM Items WHERE id = 1');
  });
});

describe('emptyList', () => {
  it('should delete all items', async () => {
    await emptyList();

    const getItemsQuery = (connect as any).results[0][1].execute.calls[0][0];

    expect(getItemsQuery).toBe('DELETE FROM Items WHERE id > 0');
  });
});
