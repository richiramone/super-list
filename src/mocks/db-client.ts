import { vi } from 'vitest';

vi.mock('../../server/db-client', () => {
  return {
    insertItem: vi.fn().mockResolvedValue(Promise.resolve),
  };
});
