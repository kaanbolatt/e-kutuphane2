export enum GridColor {
  Blue = 1,
  Red = 2,
  Orange = 3,
  Green = 4,
  Purple = 5,
  Yellow = 6,
  White = 7,
  Grey = 8,
  Pink = 9,
  DarkRed = 10,
}

export let gridColorDescriptions: Record<keyof typeof GridColor, string> = {
  Blue: 'bg-grid bg-grid-blue text-white',
  Red: 'bg-grid bg-grid-red text-white',
  Orange: 'bg-grid bg-grid-orange text-dark',
  Green: 'bg-grid bg-grid-green text-dark',
  Purple: 'bg-grid bg-grid-purple text-white',
  Yellow: 'bg-grid bg-grid-yellow text-dark',
  White: 'bg-grid bg-grid-white text-dark',
  Grey: 'bg-grid bg-grid-grey text-dark',
  Pink: 'bg-grid bg-grid-pink text-dark',
  DarkRed: 'bg-grid bg-grid-darkred text-white',
};
