export interface Cell {
  row: number;
  col: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Directions<T = number> = {
  [K in Direction]: T;
};
