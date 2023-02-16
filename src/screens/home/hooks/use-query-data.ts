/* eslint-disable @typescript-eslint/no-unsafe-return */
import {useCallback, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useQuery} from 'react-query';

import {has} from 'lodash';

import {type QueryError, type Results} from '@screens/home/types';
import {Helpers} from '@utils/Helpers';
import {Entities, Messages} from '@utils/constants';
import {type GenericFunction} from '@utils/types';

interface IQueryDataProps {
  rqData: Results | unknown;
  isLoading: boolean;
  error: QueryError | unknown;
  onPressNextPage: GenericFunction<void>;
  onPressPreviousPage: GenericFunction<void>;
  totalPages?: number;
  currentPageNumber: number;
  searchCharacters: (query: string) => void;
  searchEpisodes: (query: string) => void;
  searchLocations: (query: string) => void;
}

export const useQueryData = (): IQueryDataProps => {
  const [page, setPage] = useState<number>(0);
  const [entity, setEntity] = useState<string>(Entities.Character);
  const [query, setQuery] = useState<string>('');

  const {data, isLoading, error} = useQuery(
    ['rnm', page, query, entity],
    async () => await Helpers.fetchItems(page, query, entity),
    {
      keepPreviousData: true,
    },
  );

  const getPage = (url: string | null | undefined): number | null => {
    const urlParams = Helpers.getURLParams(url);
    if (has(urlParams, 'page')) {
      return parseInt(urlParams.page);
    }
    return null;
  };

  const onPressNextPage = (): void => {
    const nextPage = getPage(data?.info.next);

    if (nextPage !== null) {
      setPage(nextPage);
    }
  };

  const onPressPreviousPage = (): void => {
    const prevPage = getPage(data?.info.prev);

    if (prevPage !== null) {
      setPage(prevPage);
    }
  };

  const getCurrentPageNumber = (): number => {
    if (has(data, 'info.prev')) {
      const prevPageNumber = getPage(data?.info.prev);
      if (prevPageNumber !== null) {
        return prevPageNumber + 1;
      }
    }
    return 1;
  };

  const setQueryAndPage = (queryParameter: string): void => {
    setQuery(queryParameter);
    setPage(1);
  };

  const searchCharacters = useCallback((queryParameter: string): void => {
    setEntity(Entities.Character);
    setQueryAndPage(queryParameter);
  }, []);

  const searchEpisodes = (queryParameter: string): void => {
    setEntity(Entities.Episode);
    setQueryAndPage(queryParameter);
  };

  const searchLocations = (queryParameter: string): void => {
    setEntity(Entities.Location);
    setQueryAndPage(queryParameter);
  };

  const getTotalPages = (): number => {
    if (data != null && has(data, 'info.pages')) {
      return data.info.pages;
    }
    return 0;
  };

  if (!has(data, 'results')) {
    Toast.show({
      type: 'info',
      text1: Messages['no.results'],
    });
  }

  return {
    rqData: data?.results,
    isLoading,
    error,
    onPressNextPage,
    onPressPreviousPage,
    totalPages: getTotalPages(),
    currentPageNumber: getCurrentPageNumber(),
    searchCharacters,
    searchEpisodes,
    searchLocations,
  };
};
