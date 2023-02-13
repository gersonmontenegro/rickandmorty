/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useQuery} from 'react-query';

import {Helpers} from '@utils/Helpers';
import {CHARACTERS_URL, EPISODES_URL, LOCATIONS_URL} from '@utils/constants';

interface IUserQueryQuantities {
  data?: {
    locations: number;
    characters: number;
    episodes: number;
  };
  isLoading: boolean;
  error: unknown;
}

export const useQueryQuantities = (): IUserQueryQuantities => {
  const {data, isLoading, error} = useQuery(['quantities'], async () => {
    const characters = await Helpers.fetchData(CHARACTERS_URL);
    const locations = await Helpers.fetchData(LOCATIONS_URL);
    const episodes = await Helpers.fetchData(EPISODES_URL);

    return {
      characters: characters.info.count,
      locations: locations.info.count,
      episodes: episodes.info.count,
    };
  });
  return {
    data,
    isLoading,
    error,
  };
};
