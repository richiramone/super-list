export interface IItem {
  author: string;
  hasDuplicate?: boolean;
  hasQuestionMark: boolean;
  coopCategory?: string;
  id: number;
  text: string;
}

export enum CoopCategories {
  Altri,
  Carni,
  Conserve,
  Dolci,
  Farmacia,
  FruttaVerdura,
  LatticiniSalumi,
  PastaRiso,
  Pesci,
  Pulizia,
}
