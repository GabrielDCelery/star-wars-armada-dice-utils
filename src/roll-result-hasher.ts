import { EArmadaDice, EArmadaDiceSide, TRollResultCounts } from './common';
import {
  diceSideEnumToNumericConfig,
  diceSideNumericToEnumConfig,
  diceSidesConfig,
} from './configs';

const DICE_COLOR_HASH_SEPARATOR = '_';

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

const appendDiceSideToHash = ({
  forDice,
  dice,
  diceSide,
  hash,
}: {
  forDice: EArmadaDice;
  dice: EArmadaDice;
  diceSide: EArmadaDiceSide;
  hash: string;
}): string => {
  if (forDice !== dice) {
    return hash;
  }

  return [...convertHashToNumerics(hash), diceSideEnumToNumericConfig[diceSide]].sort().join('');
};

export const appendDiceSideToGroupedRollResultHash = ({
  hash,
  dice,
  diceSide,
}: {
  hash: string;
  dice: EArmadaDice;
  diceSide: EArmadaDiceSide;
}): string => {
  const [redHash, blueHash, blackHash] = hash.split(DICE_COLOR_HASH_SEPARATOR);

  return [
    appendDiceSideToHash({
      forDice: EArmadaDice.RED_DICE,
      dice,
      diceSide,
      hash: redHash,
    }),
    appendDiceSideToHash({
      forDice: EArmadaDice.BLUE_DICE,
      dice,
      diceSide,
      hash: blueHash,
    }),
    appendDiceSideToHash({
      forDice: EArmadaDice.BLACK_DICE,
      dice,
      diceSide,
      hash: blackHash,
    }),
  ].join(DICE_COLOR_HASH_SEPARATOR);
};

export const convertGroupedRollResultHashToTollResult = (
  hash: string
): {
  [EArmadaDice.RED_DICE]: EArmadaDiceSide[];
  [EArmadaDice.BLUE_DICE]: EArmadaDiceSide[];
  [EArmadaDice.BLACK_DICE]: EArmadaDiceSide[];
} => {
  const [redHash, blueHash, blackHash] = hash.split(DICE_COLOR_HASH_SEPARATOR);

  return {
    [EArmadaDice.RED_DICE]: convertHashToRollResult(redHash),
    [EArmadaDice.BLUE_DICE]: convertHashToRollResult(blueHash),
    [EArmadaDice.BLACK_DICE]: convertHashToRollResult(blackHash),
  };
};
