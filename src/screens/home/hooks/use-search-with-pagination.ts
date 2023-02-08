import {useState, useEffect} from 'react';
import axios from 'axios';
import {Helpers} from '../../../utils/Helpers';
import {
  type Pagination,
  type ResultItem,
  type Results,
  type UseSearchWithPaginationType,
} from '../types/types';
import {
  CHARACTERS_URL,
  Entities,
  EPISODES_URL,
  LOCATIONS_URL,
  SEARCH_ENDPOINT_TEMPLATE,
} from '../../../utils/constants';

const useSearchWithPagination = (): UseSearchWithPaginationType => {
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
  }, []);

  const setNewCurrentPage = (prevPage: number, nextPage: number): void => {
    if (prevPage === 0 && nextPage === 0) {
      setCurrentPage(1);
    } else if (prevPage === 0 || isNaN(prevPage)) {
      setCurrentPage(1);
    } else if (nextPage === 0 || isNaN(nextPage)) {
      setCurrentPage(prevPage + 1);
    } else if (prevPage > 0 && nextPage > 0) {
      setCurrentPage(prevPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const endpoint = SEARCH_ENDPOINT_TEMPLATE.replace('%entity%', entity)
      .replace('%query%', query)
      .replace('%page%', page);

    void axios
      .get(endpoint)
      .then((response) => {
        const results = response.data as Results;
        if (results.results.length > 0) {
          setSearchResults(results.results);
          setNewCurrentPage(
            Number(Helpers.getURLParams(results.info.prev).page) ?? 0,
            Number(Helpers.getURLParams(results.info.next).page) ?? 0,
          );
          setPagination({
            nextPage: results.info.next,
            prevPage: results.info.prev,
          });
          setTotalPages(results.info.pages);
        } else {
          setTotalPages(0);
          setPagination({
            nextPage: '',
            prevPage: '',
          });
          setSearchResults([]);
        }
        setLoading(false);
      })
      .catch((queryError) => {
        setTotalPages(0);
        setPagination({
          nextPage: '',
          prevPage: '',
        });
        setSearchResults([]);
        setNewCurrentPage(0, 0);

        setError(queryError as string);
        setLoading(false);
      });
  }, [entity, page, query]);

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
