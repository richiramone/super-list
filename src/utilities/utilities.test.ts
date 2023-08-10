import { describe, expect, it } from 'vitest';
import { IItem } from '../interfaces';
import { mockedItems } from '../mocks/mockedItems';
import { areItemsDifferent, hasDuplicatedValue, sanitize } from './utilities';

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

describe('sanitize', () => {
  it('should return escaped string', () => {
    let string = 'foo bar';
    expect(sanitize(string)).toBe(string);

    string = 'foo&bar <bool> "quotes"';
    const expectedString = 'foo&amp;bar &lt;bool> &quot;quotes&quot;';
    expect(sanitize(string)).toBe(expectedString);
  });
});

describe('areItemsDifferent', () => {
  it('should return FALSE with equals objects', () => {
    expect(areItemsDifferent(mockedItems, mockedItems)).toBeFalsy();
  });

  it('should return FALSE with equals objects', () => {
    expect(areItemsDifferent([], [])).toBeFalsy();
  });

  it('should return TRUE with different objects', () => {
    expect(areItemsDifferent(mockedItems, [])).toBeTruthy();
  });

  it('should return TRUE with different objects', () => {
    const mockedItems2 = [
      ...mockedItems,
      {
        id: 11,
        text: 'new item',
        author: 'lucas',
        hasDuplicatedValue: false,
        hasQuestionMark: true,
      },
    ];
    expect(areItemsDifferent(mockedItems, mockedItems2)).toBeTruthy();
  });
});
