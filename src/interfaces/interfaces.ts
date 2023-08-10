export interface IItem {
  author: string;
  hasDuplicate?: boolean;
  hasQuestionMark?: boolean;
  category?: string; //TODO
  id: number;
  text: string;
}
