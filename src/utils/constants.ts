import {type GenericObject} from '@utils/types';

export const CARD_WIDTH = 180;
export const CARD_HEIGHT = 90;

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
};
