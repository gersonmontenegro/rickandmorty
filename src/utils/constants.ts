import {type GenericObject} from '@utils/types';

export const GRID_WIDTH = 350;
export const GRID_HEIGHT = 350;

export const CARD_WIDTH = 150;
export const CARD_HEIGHT = 72;

export const GRADIENT_START = {x: 0.6, y: 0.5};
export const GRADIENT_END = {x: 1, y: 0.5};
export const GRADIENT_COLORS = ['#FFFFFF00', '#FFFFFF'];

export const BULLET = '•';
export const LEFT_ARROW = '•';

export const SEPARATOR = ' | ';

export enum Entities {
  Character = 'character',
  Location = 'location',
  Episode = 'episode',
}

export const itemsList = [
  {label: 'Characters', value: Entities.Character},
  {label: 'Locations', value: Entities.Location},
  {label: 'Episodes', value: Entities.Episode},
];

export const SEARCH_ENDPOINT_TEMPLATE =
  'https://rickandmortyapi.com/api/%entity%/?name=%query%&page=%page%';

export const LOCATIONS_URL = 'https://rickandmortyapi.com/api/location';
export const EPISODES_URL = 'https://rickandmortyapi.com/api/episode';
export const CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

export const Messages: GenericObject<string> = {
  'no.results': 'No hay resultados en la búsqueda',
  'type.to.search': 'Type to search...',
};

export const MAX_COLUMNS_PER_ROW = 2;
export const SEARCH_HEIGHT = 30;
export const DROPDOWN_WIDTH = 130;
export const GRADIENT_WIDTH = '100%';
export const GRADIENT_HEIGHT = '100%';
