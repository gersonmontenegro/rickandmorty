import {useCallback} from 'react';

import axios from 'axios';

import {type Results} from '@screens/home/types';

interface fetchParams {
  endpoint: string;
  onSuccess: (response: Results) => void;
  onError: () => void;
}

interface UseConnection {
  fetchData: (params: fetchParams) => Promise<void>;
}

export const useConnection = (): UseConnection => {
  const fetchData = useCallback(
    async ({endpoint, onError, onSuccess}: fetchParams): Promise<void> => {
      try {
        const response = await axios.get(endpoint);
        onSuccess(response.data as Results);
      } catch (err) {
        onError();
      }
    },
    [],
  );

  return {
    fetchData,
  };
};
