export enum category {
  PESCE = 'Pesce',
  FRUTTA_VERDURA = 'Frutta e verdura',
  SALUMI = 'Salumi',
  PASTA_RIPIENA = 'Pasta ripiena',
  LATTICINI = 'Latticini',
  CARNE = 'Carne',
  DOLCI = 'Dolci',
  PASTA = 'Pasta',
  SOTTACETI = 'Sottaceti',
  PULIZIA = 'Pulizia',
  FARMACIA = 'Farmacia',
  ALTRI = 'Altri',
}

export const basicItems = {
  [category.PESCE]: ['Cozze', 'Gamberetti', 'Insalata di mare', 'Salmone', 'Svizzera merluzzo'],
  [category.FRUTTA_VERDURA]: [
    'Aglio',
    'Banana',
    'Broccoli',
    'Carote',
    'Cipolle',
    'Fragole',
    'Lamponi',
    'Limoni',
    'Mandarini',
    'Melanazana',
    'Mele',
    'Melone',
    'Mirtilli',
    'Patate',
    'Peperoni',
    'Pistacchio',
    'Pomodori',
    'Rucula',
    'Zucchine',
  ],
  [category.SALUMI]: ['Cotto cubetti', 'Crudo', 'Pancetta', 'Pancetta strisce', 'Salame'],
  [category.PASTA_RIPIENA]: ['Tortelli', 'Tortellini'],
  [category.LATTICINI]: [
    'Brie',
    'Burro',
    'Capriccio',
    'Gorgonzola',
    'Latte',
    'Mascarpone',
    'Mozzarella',
    'Panna accida',
    'Parmigiano',
    'Peco sardo',
    'Provolone',
    'Roquefort',
    'Tomino',
    'Yogurt agnese',
    'Yogurt anna',
  ],
  [category.CARNE]: [
    'Carne',
    'Carne brodo',
    'Cosce di pollo',
    'Petto di pollo',
    'Salsiccia',
    'Scalopine',
    'Svizzera',
    'Wurster',
  ],
  [category.DOLCI]: ['Frutta da ciucciare', 'Uova', 'Zucchero'],
  [category.PASTA]: ['Fusilli', 'Riso', 'Riso cani', 'Stelline', 'Tagliatelle'],
  [category.SOTTACETI]: ['Aceto', 'Olio cani', 'Olive', 'Sale', 'Sale grosso', 'Tonno'],
  [category.PULIZIA]: [
    'Amorbidente',
    'Brillantante',
    'Sale lavastoviglie',
    'Sapone lavastoviglie',
    'Sapone lavatrice',
  ],
  [category.FARMACIA]: ['Carta igienica', 'Dentifricio', 'Deodorante', 'Scotex'],
  [category.ALTRI]: [],
};
