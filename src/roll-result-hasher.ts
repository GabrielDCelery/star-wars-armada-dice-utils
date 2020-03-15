import { EArmadaDice, EArmadaDiceSide, TRollResultCounts } from './common';
import {
  diceSideEnumToNumericConfig,
  diceSideNumericToEnumConfig,
  diceSidesConfig,
} from './configs';

export const convertHashToNumerics = (rollResultHash: string): number[] => {
  return rollResultHash.split('').map(diceSide => {
    return parseInt(diceSide, 10);
  });
};

export const convertNumericsToHash = (numerics: number[]): string => {
  return numerics.sort().join('');
};

export const convertHashToRollResult = (rollResultHash: string): EArmadaDiceSide[] => {
  return rollResultHash.split('').map(diceSide => {
    return diceSideNumericToEnumConfig[parseInt(diceSide, 10)];
  });
};

export const convertRollResultToHash = (rollResult: EArmadaDiceSide[]): string => {
  return rollResult
    .map(diceSide => {
      return diceSideEnumToNumericConfig[diceSide];
    })
    .sort()
    .join('');
};

export const getMapOfSidesThatCanOccurrForSingleDice = (dice: EArmadaDice): TRollResultCounts => {
  const diceSides: EArmadaDiceSide[] = diceSidesConfig[dice];
  const occurrencesMap: TRollResultCounts = {};

  diceSides.forEach(diceSide => {
    const diceSideAsNumeric = diceSideEnumToNumericConfig[diceSide];

    if (occurrencesMap[diceSideAsNumeric] === undefined) {
      occurrencesMap[diceSideAsNumeric] = 0;
    }

    occurrencesMap[diceSideAsNumeric]++;
  });

  return occurrencesMap;
};
