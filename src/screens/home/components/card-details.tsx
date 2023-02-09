import {has} from 'lodash';
import React, {memo, useMemo} from 'react';
import {Helpers} from '@utils/Helpers';
import {type CardDetailsProps, type ResultItem} from '../types/types';
import {CharacterDetails} from './character-details';
import {EpisodeDetails} from './episode-details';
import {LocationDetails} from './location-details';

const CardDetailsComponent = ({itemDetails}: CardDetailsProps): JSX.Element => {
  const hasResidents = has(itemDetails, 'residents');
  const hasCharacters = has(itemDetails, 'characters');

  const createEpidosdesList = useMemo((): string | unknown => {
    const isEpisodesArray = Array.isArray(itemDetails?.episode);
    const episodes = isEpisodesArray ? (itemDetails?.episode as unknown as string[]) : [];
    return isEpisodesArray
      ? episodes.map((item: string) => Helpers.getLastNumber(item)).join(',')
      : '';
  }, [itemDetails?.episode]);

  const createCharacterDetails = useMemo((): Record<
    string,
    string | undefined | unknown | ResultItem['origin']
  > => {
    const detailsCreated: Record<string, string | undefined | unknown | ResultItem['origin']> = {};

    detailsCreated.name = itemDetails?.name;
    detailsCreated.status = itemDetails?.status;
    detailsCreated.species = itemDetails?.species;
    detailsCreated.gender = itemDetails?.gender;
    detailsCreated.origin = itemDetails?.origin;
    detailsCreated.location = itemDetails?.location;
    detailsCreated.episodes = createEpidosdesList;

    return detailsCreated;
  }, [
    createEpidosdesList,
    itemDetails?.gender,
    itemDetails?.location,
    itemDetails?.name,
    itemDetails?.origin,
    itemDetails?.species,
    itemDetails?.status,
  ]);

  const createLocationDetails = (): Record<string, string | undefined> => {
    const detailsCreated: Record<string, string | undefined> = {};

    detailsCreated.name = itemDetails?.name;
    detailsCreated.dimension = itemDetails?.dimension;
    detailsCreated.type = itemDetails?.type;

    return detailsCreated;
  };

  const createEpisodeDetails = (): Record<string, string | undefined> => {
    const detailsCreated: Record<string, string | undefined> = {};

    detailsCreated.name = itemDetails?.name;
    detailsCreated.air_date = itemDetails?.air_date;
    detailsCreated.episode = itemDetails?.episode;

    return detailsCreated;
  };

  if (hasResidents) {
    return <LocationDetails {...createLocationDetails()} />;
  } else if (hasCharacters) {
    return <EpisodeDetails {...createEpisodeDetails()} />;
  } else {
    return <CharacterDetails {...createCharacterDetails} />;
  }
};

export const CardDetails = memo(CardDetailsComponent);
