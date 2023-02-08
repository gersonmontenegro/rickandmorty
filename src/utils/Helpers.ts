import {has} from 'lodash';
import {type Source} from 'react-native-fast-image';
import {Morty, Rick} from '../assets/images';
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

  getImage: (itemDetails: ResultItem | null): Source => {
    const hasResidents = has(itemDetails, 'residents');
    const hasCharacters = has(itemDetails, 'characters');

    if (hasResidents) {
      return Rick as Source;
    } else if (hasCharacters) {
      return Morty as Source;
    } else {
      return {uri: itemDetails?.image};
    }
  },
};
