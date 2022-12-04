import { describe, expect, it } from 'vitest';
import { IItem } from '../interfaces';
import { hasDuplicatedValue, noop, sanitize } from './utilities';

describe('hasDuplicatedValue', () => {
  it('should return FALSE whenever the items arent duplicated', () => {
    const items: IItem[] = [
      {
        id: 1,
        hasQuestionMark: false,
        hasDuplicate: false,
        author: 'cortazar',
        text: 'cheese',
      },
      {
        id: 1,
        hasQuestionMark: false,
        hasDuplicate: false,
        author: 'cortazar',
        text: 'ham',
      },
    ];
    const repeatedItems = hasDuplicatedValue(items, 'new value');
    expect(repeatedItems).toBe(false);
  });

  it('should return TRUE whenever the items are duplicated', () => {
    const items: IItem[] = [
      {
        id: 1,
        hasQuestionMark: false,
        hasDuplicate: false,
        author: 'cortazar',
        text: 'cheese',
      },
      {
        id: 1,
        hasQuestionMark: false,
        hasDuplicate: false,
        author: 'cortazar',
        text: 'ham',
      },
    ];
    const repeatedItems = hasDuplicatedValue(items, 'cheese');
    expect(repeatedItems).toBe(true);
  });
});

describe('noop', () => {
  it('should be an empty function', () => {
    expect(noop()).toBeUndefined();
  });
});

describe('sanitize', () => {
  it('should return escaped string', () => {
    let string = 'foo bar';
    expect(sanitize(string)).toBe(string);

    string = 'foo&bar <bool> "quotes"';
    const expectedString = 'foo&amp;bar &lt;bool> &quot;quotes&quot;';
    expect(sanitize(string)).toBe(expectedString);
  });
});
