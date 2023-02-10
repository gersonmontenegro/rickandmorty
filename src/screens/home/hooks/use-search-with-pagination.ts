/* eslint-disable @typescript-eslint/no-floating-promises */
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {isNil} from 'lodash';

import {
  type Pagination,
  type ResultItem,
  type Results,
  type UseSearchWithPaginationType,
} from '@screens/home/types';
import {Helpers} from '@utils/Helpers';
import {
  CHARACTERS_URL,
  EPISODES_URL,
  Entities,
  LOCATIONS_URL,
  Messages,
  SEARCH_ENDPOINT_TEMPLATE,
} from '@utils/constants';
import {useConnection} from '@utils/hooks/use-connection';

const useSearchWithPagination = (): UseSearchWithPaginationType => {
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState<Pagination>({nextPage: '', prevPage: ''});
  const [totalPages, setTotalPages] = useState<number>(0);
  const [entity, setEntity] = useState<string>(Entities.Character);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [locations, setLocations] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);
  const [episodes, setEpisodes] = useState<number>(0);

  const {fetchData} = useConnection();

  const onLocationsSuccess = (data: Results): void => {
    setLocations(data.info.count);
  };

  const onCharactersSuccess = (data: Results): void => {
    setCharacters(data.info.count);
  };

  const onEpisodesSuccess = (data: Results): void => {
    setEpisodes(data.info.count);
  };

  const onError = (): void => {
    Toast.show({
      type: 'info',
      text1: Messages['no.results'],
    });
  };

  const setQueryAndPage = (queryParameter: string): void => {
    setQuery(queryParameter);
    setPage('0');
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

  useEffect(() => {
    fetchData({
      endpoint: LOCATIONS_URL,
      onSuccess: onLocationsSuccess,
      onError,
    });

    fetchData({
      endpoint: CHARACTERS_URL,
      onSuccess: onCharactersSuccess,
      onError,
    });

    fetchData({
      endpoint: EPISODES_URL,
      onSuccess: onEpisodesSuccess,
      onError,
    });

    searchCharacters('');
  }, [fetchData, searchCharacters]);

  const setNewCurrentPage = (prevPage: number, nextPage: number): void => {
    if (prevPage === 0 && nextPage === 0) {
      setCurrentPage(1);
    } else if (prevPage === -1) {
      setCurrentPage(0);
    } else if (prevPage === 0 || isNaN(prevPage)) {
      setCurrentPage(1);
    } else if (nextPage === 0 || isNaN(nextPage)) {
      setCurrentPage(prevPage + 1);
    } else if (prevPage > 0 && nextPage > 0) {
      setCurrentPage(prevPage + 1);
    }
  };

  const onSearchResponse = useCallback((dataResponse: Results): void => {
    const {results, info} = dataResponse;

    if (!isNil(results)) {
      setSearchResults(results);
      setNewCurrentPage(
        Number(Helpers.getURLParams(info.prev).page) ?? 0,
        Number(Helpers.getURLParams(info.next).page) ?? 0,
      );
      setPagination({
        nextPage: info.next,
        prevPage: info.prev,
      });
      setTotalPages(info.pages);
    }
  }, []);

  const onSearchError = useCallback((): void => {
    Toast.show({
      type: 'info',
      text1: Messages['no.results'],
    });

    setNewCurrentPage(-1, 0);
    setPagination({
      nextPage: '',
      prevPage: '',
    });
    setSearchResults([]);
    setTotalPages(0);

    setError(Messages['no.results']);
    setLoading(false);
  }, []);

  const endpoint = useMemo(() => {
    return SEARCH_ENDPOINT_TEMPLATE.replace('%entity%', entity)
      .replace('%query%', query)
      .replace('%page%', page);
  }, [entity, page, query]);

  const isPageValid = useMemo(() => page !== '', [page]);

  useEffect(() => {
    setLoading(true);
    setError('');

    if (isPageValid) {
      fetchData({
        endpoint,
        onError: onSearchError,
        onSuccess: onSearchResponse,
      });
    }
  }, [endpoint, entity, fetchData, isPageValid, onSearchError, onSearchResponse, page, query]);

  const handleNextPage = (): void => {
    const pageToGo = Helpers.getURLParams(pagination.nextPage).page;
    if (pageToGo !== '') {
      setPage(pageToGo);
    }
  };

  const handlePrevPage = (): void => {
    const pageToGo = Helpers.getURLParams(pagination.prevPage).page;
    if (pageToGo !== '') {
      setPage(pageToGo);
    }
  };

  return {
    results: searchResults,
    loading,
    error,
    handleNextPage,
    handlePrevPage,
    searchCharacters,
    searchEpisodes,
    searchLocations,
    totalPages,
    currentPage,
    locations,
    episodes,
    characters,
  };
};

export {useSearchWithPagination};
