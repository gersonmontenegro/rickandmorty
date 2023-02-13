import {type Source} from 'react-native-fast-image';

import {has} from 'lodash';

import {Morty, Rick} from '@assets/images';
import {type ResultItem, type ResultsInfo} from '@screens/home/types';

import {SEARCH_ENDPOINT_TEMPLATE} from './constants';

export const Helpers = {
  getURLParams: (url: string | null | undefined): Record<string, string> => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params: Record<string, string> = {};
    let match;
    while ((match = regex.exec(url ?? '')) != null) {
      params[match[1]] = match[2];
    }
    return params;
  },

  getLastNumber: (url: string): string => (url !== null ? url.match(/\d+$/)[0] : ''),

  isLocation: (itemDetails: ResultItem | null): boolean => {
    return has(itemDetails, 'residents');
  },

  isCharacter: (itemDetails: ResultItem | null): boolean => {
    return has(itemDetails, 'status');
  },

  isEpisode: (itemDetails: ResultItem | null): boolean => {
    return has(itemDetails, 'characters');
  },

  getFirstEpisode: (itemDetails: ResultItem | null): '' => {
    if (has(itemDetails, 'episode')) {
      if (typeof itemDetails?.episode === 'object') {
        return itemDetails?.episode[0];
      }
    }
    return '';
  },

  getImage: (itemDetails: ResultItem | null): Source => {
    const hasResidents = Helpers.isLocation(itemDetails);
    const hasCharacters = Helpers.isEpisode(itemDetails);

    if (hasResidents) {
      return Rick as Source;
    } else if (hasCharacters) {
      return Morty as Source;
    } else {
      return {uri: itemDetails?.image};
    }
  },

  fetchItems: async (
    pageToLoad = 0,
    searchName = '',
    entityToSearch = '',
  ): Promise<Response & {info: ResultsInfo; results: ResultItem[]}> => {
    const endpoint = SEARCH_ENDPOINT_TEMPLATE.replace('%entity%', entityToSearch)
      .replace('%query%', searchName)
      .replace('%page%', pageToLoad.toString());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await fetch(endpoint).then(async (res) => await res.json());
  },

  fetchData: async (
    endpoint: string,
  ): Promise<Response & {info: ResultsInfo; results: ResultItem[]}> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await fetch(endpoint).then(async (res) => await res.json());
  },
};
