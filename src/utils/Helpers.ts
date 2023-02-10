import {type Source} from 'react-native-fast-image';

import {has} from 'lodash';

import {Morty, Rick} from '@assets/images';

import {type ResultItem} from '../screens/home/types/types';

export const Helpers = {
  getURLParams: (url: string | null): Record<string, string> => {
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

  isEpisode: (itemDetails: ResultItem | null): boolean => {
    return has(itemDetails, 'characters');
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
};
