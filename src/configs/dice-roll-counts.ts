import { EArmadaDice, EArmadaDiceSide, TRollResultCounts } from '../common';
import { diceSidesConfig } from './dice-sides';

export type DiceSideOccurrencesConfig = {
  [key in EArmadaDice]: TRollResultCounts;
};

const getDiceRollResultSideCounts = (dice: EArmadaDice): TRollResultCounts => {
  const diceSides: EArmadaDiceSide[] = diceSidesConfig[dice];
  const occurrencesMap: TRollResultCounts = {};

  diceSides.forEach(diceSide => {
    if (occurrencesMap[diceSide] === undefined) {
      occurrencesMap[diceSide] = 0;
    }

    occurrencesMap[diceSide]++;
  });

  return occurrencesMap;
};

export const diceRollSideCountsConfig = {
  [EArmadaDice.RED_DICE]: getDiceRollResultSideCounts(EArmadaDice.RED_DICE),
  [EArmadaDice.BLUE_DICE]: getDiceRollResultSideCounts(EArmadaDice.BLUE_DICE),
  [EArmadaDice.BLACK_DICE]: getDiceRollResultSideCounts(EArmadaDice.BLACK_DICE),
};
