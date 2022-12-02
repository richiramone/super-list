import { describe, expect, it } from 'vitest';
import { IItem } from '../interfaces';
import { getAuthor, hasDuplicatedValue, noop, sanitize } from './utilities';

describe('getAuthor', () => {
  it('should return lucas when no query string is present on browser', () => {
    expect(getAuthor()).toBe('lucas');
  });

  it('should return query string user value when present', () => {
    const url = `${window.location.toString()}?user=anna`;
    window.history.pushState(null, '', url);

    expect(getAuthor()).toBe('anna');
  });
});

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
    expect(noop()).toBeTypeOf('undefined');
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
