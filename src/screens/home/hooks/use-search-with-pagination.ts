import {useCallback, useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import axios, {type AxiosResponse} from 'axios';
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

const useSearchWithPagination = (): UseSearchWithPaginationType => {
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState<Pagination>({nextPage: '', prevPage: ''});
  const [totalPages, setTotalPages] = useState<number>(0);
  const [entity, setEntity] = useState<string>('characters');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [locations, setLocations] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);
  const [episodes, setEpisodes] = useState<number>(0);

  useEffect(() => {
    void axios.get(LOCATIONS_URL).then((locationsData) => {
      const locationInfo = locationsData.data as Results;
      setLocations(locationInfo.info.count);
    });

    void axios.get(CHARACTERS_URL).then((episodesData) => {
      const episodesInfo = episodesData.data as Results;
      setCharacters(episodesInfo.info.count);
    });

    void axios.get(EPISODES_URL).then((characteresData) => {
      const characteresInfo = characteresData.data as Results;
      setEpisodes(characteresInfo.info.count);
    });

    searchCharacters('');
  }, []);

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

  const onSearchResponse = useCallback((response: AxiosResponse): void => {
    const dataResponse = response.data as Results;
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

  useEffect(() => {
    setLoading(true);
    setError('');

    if (page !== '') {
      const endpoint = SEARCH_ENDPOINT_TEMPLATE.replace('%entity%', entity)
        .replace('%query%', query)
        .replace('%page%', page);

      void axios.get(endpoint).then(onSearchResponse).catch(onSearchError);
    }
  }, [entity, onSearchError, onSearchResponse, page, query]);

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

  const searchCharacters = (queryParameter: string): void => {
    setEntity(Entities.Character);
    setQuery(queryParameter);
    setPage('0');
  };

  const searchEpisodes = (queryParameter: string): void => {
    setEntity(Entities.Episode);
    setQuery(queryParameter);
    setPage('0');
  };

  const searchLocations = (queryParameter: string): void => {
    setEntity(Entities.Location);
    setQuery(queryParameter);
    setPage('0');
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
